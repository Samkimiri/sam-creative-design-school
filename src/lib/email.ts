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
  const replyTo = process.env.SCDS_EMAIL_REPLY_TO || "samcreativedesignschool@gmail.com";
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
        reply_to: replyTo,
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

interface SendEnrollmentRejectedEmailInput {
  to: string;
  studentName: string;
  courseNames: string[];
  reference: string;
  reason?: string;
  enrollUrl: string;
}

export async function sendEnrollmentRejectedEmail(input: SendEnrollmentRejectedEmailInput) {
  const courseList = formatCourseList(input.courseNames);
  return sendTransactionalEmail({
    to: input.to,
    subject: `Update on your ${courseList} enrollment request`,
    html: enrollmentRejectedHtml(input, courseList),
    text: enrollmentRejectedText(input, courseList),
  });
}

function enrollmentRejectedText(input: SendEnrollmentRejectedEmailInput, courseList: string) {
  const lines = [
    `Hi ${input.studentName},`,
    "",
    `Thank you for your interest in ${courseList} at Sam Creative Design School.`,
    "",
    "After review, we were unable to confirm payment for this enrollment request, so we're not able to move forward with it at this time.",
    "",
    `Reference: ${input.reference}`,
  ];

  if (input.reason) {
    lines.push("", `Note from our team: ${input.reason}`);
  }

  lines.push(
    "",
    "If you believe this is a mistake, or you've already paid and have a confirmation, please reach out to us on WhatsApp with the payment details and we'll happily take another look.",
    "",
    "Otherwise, you're welcome to submit a new enrollment and complete payment here whenever you're ready:",
    input.enrollUrl,
    "",
    "We'd love to have you join us and look forward to hearing from you.",
    "",
    "Sam Creative Design School"
  );

  return lines.join("\n");
}

function enrollmentRejectedHtml(input: SendEnrollmentRejectedEmailInput, courseList: string) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">Update on your enrollment request</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>Thank you for your interest in <strong>${escapeHtml(courseList)}</strong> at Sam Creative Design School.</p>
    <p>After review, we were unable to confirm payment for this enrollment request, so we're not able to move forward with it at this time.</p>
    <div style="background:#F3F4F6;border-radius:12px;padding:16px 18px;margin:16px 0">
      <p style="margin:0 0 6px;font-size:13px;color:#6B7280">Reference</p>
      <p style="margin:0;font-weight:700;color:#050914">${escapeHtml(input.reference)}</p>
      ${input.reason ? `
      <p style="margin:12px 0 6px;font-size:13px;color:#6B7280">Note from our team</p>
      <p style="margin:0;color:#374151">${escapeHtml(input.reason)}</p>
      ` : ""}
    </div>
    <p>If you believe this is a mistake, or you've already paid and have a confirmation, please reach out to us on WhatsApp with the payment details and we'll happily take another look.</p>
    <p>Otherwise, you're welcome to submit a new enrollment and complete payment whenever you're ready.</p>
    ${emailButton("Enroll Again", input.enrollUrl)}
    <p>We'd love to have you join us and look forward to hearing from you.</p>
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

interface SendInactivityNudgeEmailInput {
  to: string;
  studentName: string;
  courseNames: string[];
  lmsUrl: string;
}

export async function sendInactivityNudgeEmail(input: SendInactivityNudgeEmailInput) {
  const courseList = formatCourseList(input.courseNames);
  return sendTransactionalEmail({
    to: input.to,
    subject: "We miss you at Sam Creative Design School",
    html: inactivityNudgeHtml(input, courseList),
    text: inactivityNudgeText(input, courseList),
  });
}

function inactivityNudgeText(input: SendInactivityNudgeEmailInput, courseList: string) {
  return [
    `Hi ${input.studentName},`,
    "",
    `We noticed it's been a little while since you last worked on ${courseList} here at Sam Creative Design School.`,
    "",
    "Your progress is saved and waiting for you exactly where you left off. Even 20-30 minutes a week keeps your momentum going and gets you to your certificate faster.",
    "",
    "Pick up right where you left off:",
    input.lmsUrl,
    "",
    "If anything is blocking you - a technical issue, a confusing lesson, or just needing a nudge in the right direction - reply to this email or reach us on WhatsApp. We're here to help.",
    "",
    "We'd love to see you back in class soon.",
    "",
    "Sam Creative Design School",
  ].join("\n");
}

function inactivityNudgeHtml(input: SendInactivityNudgeEmailInput, courseList: string) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">We miss you!</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>We noticed it's been a little while since you last worked on <strong>${escapeHtml(courseList)}</strong> here at Sam Creative Design School.</p>
    <p>Your progress is saved and waiting for you exactly where you left off. Even 20-30 minutes a week keeps your momentum going and gets you to your certificate faster.</p>
    ${emailButton("Continue Learning", input.lmsUrl)}
    <p>If anything is blocking you - a technical issue, a confusing lesson, or just needing a nudge in the right direction - reply to this email or reach us on WhatsApp. We're here to help.</p>
    <p>We'd love to see you back in class soon.</p>
  `);
}

interface SendNewCourseSuggestionEmailInput {
  to: string;
  studentName: string;
  completedCourseNames: string[];
  suggestedCourseNames: string[];
  coursesUrl: string;
}

export async function sendNewCourseSuggestionEmail(input: SendNewCourseSuggestionEmailInput) {
  const completedList = formatCourseList(input.completedCourseNames);
  return sendTransactionalEmail({
    to: input.to,
    subject: `Congratulations on finishing ${completedList}! What's next?`,
    html: newCourseSuggestionHtml(input, completedList),
    text: newCourseSuggestionText(input, completedList),
  });
}

function newCourseSuggestionText(input: SendNewCourseSuggestionEmailInput, completedList: string) {
  const lines = [
    `Hi ${input.studentName},`,
    "",
    `Congratulations on completing ${completedList}! That's a real achievement, and we hope you're proud of the skills and projects you've built along the way.`,
    "",
    "Your learning doesn't have to stop here. Many of our students continue building their portfolio and expanding their skill set with another course.",
  ];

  if (input.suggestedCourseNames.length > 0) {
    lines.push("", "A few courses you might enjoy next:", ...input.suggestedCourseNames.map((name) => `- ${name}`));
  }

  lines.push(
    "",
    "Browse all courses and enroll here:",
    input.coursesUrl,
    "",
    "Thank you for learning with us - we'd love to continue the adventure with you.",
    "",
    "Sam Creative Design School"
  );

  return lines.join("\n");
}

function newCourseSuggestionHtml(input: SendNewCourseSuggestionEmailInput, completedList: string) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">Congratulations!</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>Congratulations on completing <strong>${escapeHtml(completedList)}</strong>! That's a real achievement, and we hope you're proud of the skills and projects you've built along the way.</p>
    <p>Your learning doesn't have to stop here. Many of our students continue building their portfolio and expanding their skill set with another course.</p>
    ${input.suggestedCourseNames.length > 0 ? `
    <div style="background:#F3F4F6;border-radius:12px;padding:16px 18px;margin:16px 0">
      <p style="margin:0 0 8px;font-size:13px;color:#6B7280">A few courses you might enjoy next</p>
      <ul style="margin:0;padding-left:18px;color:#050914;font-weight:700">
        ${input.suggestedCourseNames.map((name) => `<li style="margin-bottom:4px">${escapeHtml(name)}</li>`).join("")}
      </ul>
    </div>
    ` : ""}
    ${emailButton("Browse Courses", input.coursesUrl)}
    <p>Thank you for learning with us - we'd love to continue the adventure with you.</p>
  `);
}

interface SendProgressMilestoneEmailInput {
  to: string;
  studentName: string;
  courseName: string;
  percent: number;
  lmsUrl: string;
}

export async function sendProgressMilestoneEmail(input: SendProgressMilestoneEmailInput) {
  return sendTransactionalEmail({
    to: input.to,
    subject: `You're ${input.percent}% through ${input.courseName}!`,
    html: progressMilestoneHtml(input),
    text: progressMilestoneText(input),
  });
}

function progressMilestoneText(input: SendProgressMilestoneEmailInput) {
  return [
    `Hi ${input.studentName},`,
    "",
    `Great progress! You've just crossed ${input.percent}% completion in ${input.courseName} at Sam Creative Design School.`,
    "",
    "Keep this momentum going - you're getting closer to your certificate with every lesson.",
    "",
    "Continue learning:",
    input.lmsUrl,
    "",
    "Sam Creative Design School",
  ].join("\n");
}

function progressMilestoneHtml(input: SendProgressMilestoneEmailInput) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">Great progress!</h1>
    <p>Hi ${escapeHtml(input.studentName)},</p>
    <p>You've just crossed <strong>${input.percent}% completion</strong> in <strong>${escapeHtml(input.courseName)}</strong> at Sam Creative Design School.</p>
    <div style="background:#F3F4F6;border-radius:12px;padding:4px;margin:16px 0">
      <div style="background:#0056FF;height:14px;border-radius:8px;width:${Math.max(4, Math.min(100, input.percent))}%"></div>
    </div>
    <p>Keep this momentum going - you're getting closer to your certificate with every lesson.</p>
    ${emailButton("Continue Learning", input.lmsUrl)}
  `);
}

interface SendAdminNewEnrollmentAlertEmailInput {
  to: string;
  studentName: string;
  courseNames: string[];
  amount: number;
  reference: string;
  adminUrl: string;
}

export async function sendAdminNewEnrollmentAlertEmail(input: SendAdminNewEnrollmentAlertEmailInput) {
  return sendTransactionalEmail({
    to: input.to,
    subject: `New enrollment request: ${input.studentName}`,
    html: adminNewEnrollmentAlertHtml(input),
    text: adminNewEnrollmentAlertText(input),
  });
}

function adminNewEnrollmentAlertText(input: SendAdminNewEnrollmentAlertEmailInput) {
  return [
    `${input.studentName} just submitted an enrollment request for ${formatCourseList(input.courseNames)}.`,
    `Amount: Ksh ${input.amount.toLocaleString()}`,
    `Reference: ${input.reference}`,
    "",
    "Review and approve it here:",
    input.adminUrl,
    "",
    "Sam Creative Design School",
  ].join("\n");
}

function adminNewEnrollmentAlertHtml(input: SendAdminNewEnrollmentAlertEmailInput) {
  return emailShell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#050914">New enrollment request</h1>
    <p><strong>${escapeHtml(input.studentName)}</strong> just submitted an enrollment request for <strong>${escapeHtml(formatCourseList(input.courseNames))}</strong>.</p>
    <p style="color:#374151">Amount: Ksh ${input.amount.toLocaleString()}<br />Reference: ${escapeHtml(input.reference)}</p>
    ${emailButton("Review in Admin Dashboard", input.adminUrl)}
  `);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
