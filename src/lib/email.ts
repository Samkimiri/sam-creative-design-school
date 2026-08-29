type EmailSendResult =
  | { sent: true; reason: "sent" }
  | { sent: false; reason: "missing-provider" | "send-failed" | "timeout" };

async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`Email skipped ("${input.subject}"): RESEND_API_KEY is not configured.`);
    return { sent: false, reason: "missing-provider" };
  }

  const from = process.env.SCDS_EMAIL_FROM || "Sam Creative Design School <onboarding@resend.dev>";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    const reason = error instanceof DOMException && error.name === "AbortError" ? "timeout" : "send-failed";
    console.error(`Email request failed ("${input.subject}"):`, reason);
    return { sent: false, reason };
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`Email failed ("${input.subject}"):`, response.status, body);
    return { sent: false, reason: "send-failed" };
  }

  return { sent: true, reason: "sent" };
}

function formatCourseList(names: string[]) {
  const unique = [...new Set(names.map((name) => name.trim()).filter(Boolean))];
  if (unique.length === 0) return "your course";
  if (unique.length === 1) return unique[0];
  if (unique.length === 2) return `${unique[0]} and ${unique[1]}`;
  return `${unique.slice(0, -1).join(", ")}, and ${unique[unique.length - 1]}`;
}

function emailShell(bodyHtml: string) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:560px;margin:0 auto;padding:24px">
      ${bodyHtml}
      <p style="color:#6B7280;font-size:13px;margin-top:32px">Sam Creative Design School</p>
    </div>
  `;
}

function emailButton(label: string, url: string) {
  return `
    <p>
      <a href="${url}" style="display:inline-block;background:#0056FF;color:#fff;text-decoration:none;font-weight:700;padding:14px 20px;border-radius:12px">
        ${escapeHtml(label)}
      </a>
    </p>
  `;
}

interface SendPasswordResetEmailInput {
  to: string;
  studentName: string;
  resetCode: string;
  resetUrl: string;
  expiresInMinutes: number;
}

export async function sendPasswordResetEmail(input: SendPasswordResetEmailInput) {
  return sendTransactionalEmail({
    to: input.to,
    subject: "Reset your SCDS password",
    html: passwordResetHtml(input),
    text: passwordResetText(input),
  });
}

function passwordResetText(input: SendPasswordResetEmailInput) {
  return [
    `Hi ${input.studentName},`,
    "",
    "We received a request to reset your Sam Creative Design School password.",
    `Your reset code is: ${input.resetCode}`,
    "",
    `Use this secure link within ${input.expiresInMinutes} minutes:`,
    input.resetUrl,
    "",
    "If you did not request this, you can ignore this email.",
    "Sam Creative Design School",
  ].join("\n");
}

function passwordResetHtml(input: SendPasswordResetEmailInput) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">Reset your SCDS password</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>We received a request to reset your Sam Creative Design School password.</p>
    <p style="font-size:15px;color:#374151;margin-bottom:8px">Your reset code is:</p>
    <p style="font-size:28px;letter-spacing:6px;font-weight:800;color:#050914;background:#F3F4F6;border-radius:12px;padding:14px 18px;text-align:center">
      ${escapeHtml(input.resetCode)}
    </p>
    ${emailButton("Reset Password", input.resetUrl)}
    <p>This secure link expires in ${input.expiresInMinutes} minutes.</p>
    <p>If you did not request this, you can safely ignore this email.</p>
  `);
}

interface SendEnrollmentApprovedEmailInput {
  to: string;
  studentName: string;
  courseNames: string[];
  reference: string;
  amount: number;
  lmsUrl: string;
}

export async function sendEnrollmentApprovedEmail(input: SendEnrollmentApprovedEmailInput) {
  const courseList = formatCourseList(input.courseNames);
  return sendTransactionalEmail({
    to: input.to,
    subject: `You're enrolled! Access to ${courseList} is now live`,
    html: enrollmentApprovedHtml(input, courseList),
    text: enrollmentApprovedText(input, courseList),
  });
}

function enrollmentApprovedText(input: SendEnrollmentApprovedEmailInput, courseList: string) {
  return [
    `Hi ${input.studentName},`,
    "",
    `Great news — your payment has been confirmed and your access to ${courseList} is now live.`,
    "",
    `Reference: ${input.reference}`,
    `Amount confirmed: Ksh ${input.amount.toLocaleString()}`,
    "",
    "You can start learning right away here:",
    input.lmsUrl,
    "",
    "If you run into any issues signing in or picking up where you left off, our team is happy to help on WhatsApp.",
    "",
    "Welcome aboard, and enjoy the course!",
    "Sam Creative Design School",
  ].join("\n");
}

function enrollmentApprovedHtml(input: SendEnrollmentApprovedEmailInput, courseList: string) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">You're enrolled!</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>Great news — your payment has been confirmed and your access to <strong>${escapeHtml(courseList)}</strong> is now live.</p>
    <div style="background:#F3F4F6;border-radius:12px;padding:16px 18px;margin:16px 0">
      <p style="margin:0 0 6px;font-size:13px;color:#6B7280">Reference</p>
      <p style="margin:0 0 12px;font-weight:700;color:#050914">${escapeHtml(input.reference)}</p>
      <p style="margin:0 0 6px;font-size:13px;color:#6B7280">Amount confirmed</p>
      <p style="margin:0;font-weight:700;color:#050914">Ksh ${input.amount.toLocaleString()}</p>
    </div>
    ${emailButton("Go to LMS", input.lmsUrl)}
    <p>If you run into any issues signing in or picking up where you left off, our team is happy to help on WhatsApp.</p>
    <p>Welcome aboard, and enjoy the course!</p>
  `);
}

interface SendDisenrollmentEmailInput {
  to: string;
  studentName: string;
  courseNames: string[];
  reason?: string;
  enrollUrl: string;
}

export async function sendDisenrollmentEmail(input: SendDisenrollmentEmailInput) {
  const courseList = formatCourseList(input.courseNames);
  return sendTransactionalEmail({
    to: input.to,
    subject: `Update on your enrollment in ${courseList}`,
    html: disenrollmentHtml(input, courseList),
    text: disenrollmentText(input, courseList),
  });
}

function disenrollmentText(input: SendDisenrollmentEmailInput, courseList: string) {
  const lines = [
    `Hi ${input.studentName},`,
    "",
    `We're writing to let you know that your access to ${courseList} has been paused by our team, effective immediately.`,
  ];

  if (input.reason) {
    lines.push("", `Reason provided: ${input.reason}`);
  }

  lines.push(
    "",
    "This isn't a decision we take lightly, and we're glad to discuss it directly if you'd like more context or believe this was a mistake — just reach out on WhatsApp.",
    "",
    "If you'd like to continue your learning journey with us, you're welcome to submit a new enrollment and complete payment again at:",
    input.enrollUrl,
    "",
    "Sam Creative Design School"
  );

  return lines.join("\n");
}

function disenrollmentHtml(input: SendDisenrollmentEmailInput, courseList: string) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">Update on your enrollment</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>We're writing to let you know that your access to <strong>${escapeHtml(courseList)}</strong> has been paused by our team, effective immediately.</p>
    ${input.reason ? `
    <div style="background:#FEF2F2;border-left:4px solid #DC2626;border-radius:8px;padding:14px 18px;margin:16px 0">
      <p style="margin:0 0 4px;font-size:13px;color:#991B1B;font-weight:700">Reason provided</p>
      <p style="margin:0;color:#7F1D1D">${escapeHtml(input.reason)}</p>
    </div>
    ` : ""}
    <p>This isn't a decision we take lightly, and we're glad to discuss it directly if you'd like more context or believe this was a mistake — just reach out on WhatsApp.</p>
    <p>If you'd like to continue your learning journey with us, you're welcome to submit a new enrollment and complete payment again.</p>
    ${emailButton("Enroll Again", input.enrollUrl)}
  `);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
