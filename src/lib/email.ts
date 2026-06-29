interface SendPasswordResetEmailInput {
  to: string;
  studentName: string;
  resetUrl: string;
  expiresInMinutes: number;
}

type PasswordResetEmailResult =
  | { sent: true; reason: "sent" }
  | { sent: false; reason: "missing-provider" | "send-failed" | "timeout" };

export async function sendPasswordResetEmail(input: SendPasswordResetEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Password reset email skipped: RESEND_API_KEY is not configured.");
    return { sent: false, reason: "missing-provider" } satisfies PasswordResetEmailResult;
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
        subject: "Reset your SCDS password",
        html: passwordResetHtml(input),
        text: passwordResetText(input),
      }),
      signal: controller.signal,
    });
  } catch (error) {
    const reason = error instanceof DOMException && error.name === "AbortError" ? "timeout" : "send-failed";
    console.error("Password reset email request failed:", reason);
    return { sent: false, reason } satisfies PasswordResetEmailResult;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("Password reset email failed:", response.status, body);
    return { sent: false, reason: "send-failed" } satisfies PasswordResetEmailResult;
  }

  return { sent: true, reason: "sent" } satisfies PasswordResetEmailResult;
}

function passwordResetText(input: SendPasswordResetEmailInput) {
  return [
    `Hi ${input.studentName},`,
    "",
    "We received a request to reset your Sam Creative Design School password.",
    `Use this secure link within ${input.expiresInMinutes} minutes:`,
    input.resetUrl,
    "",
    "If you did not request this, you can ignore this email.",
    "Sam Creative Design School",
  ].join("\n");
}

function passwordResetHtml(input: SendPasswordResetEmailInput) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:560px;margin:0 auto;padding:24px">
      <h1 style="margin:0 0 12px;font-size:24px;color:#050914">Reset your SCDS password</h1>
      <p>Hi ${escapeHtml(input.studentName)},</p>
      <p>We received a request to reset your Sam Creative Design School password.</p>
      <p>
        <a href="${input.resetUrl}" style="display:inline-block;background:#0056FF;color:#fff;text-decoration:none;font-weight:700;padding:14px 20px;border-radius:12px">
          Reset Password
        </a>
      </p>
      <p>This secure link expires in ${input.expiresInMinutes} minutes.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
      <p style="color:#6B7280;font-size:13px">Sam Creative Design School</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
