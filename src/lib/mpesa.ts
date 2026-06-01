const SANDBOX_BASE = "https://sandbox.safaricom.co.ke";
const PRODUCTION_BASE = "https://api.safaricom.co.ke";

export interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  callbackUrl: string;
  transactionType: string;
  partyB?: string;
}

export interface StkPushResult {
  success: boolean;
  responseCode?: string;
  responseDescription?: string;
  customerMessage?: string;
  merchantRequestId?: string;
  checkoutRequestId?: string;
  errorMessage?: string;
  raw?: Record<string, unknown>;
}

export interface StkQueryResult {
  success: boolean;
  resultCode?: string;
  resultDesc?: string;
  raw?: Record<string, unknown>;
}

async function readMpesaResponse(response: Response): Promise<Record<string, unknown>> {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as Record<string, unknown>;
  }

  const text = await response.text();
  return {
    errorMessage:
      text ||
      `M-Pesa API returned HTTP ${response.status} ${response.statusText}`,
    httpStatus: response.status,
    httpStatusText: response.statusText,
  };
}

function mpesaErrorMessage(
  data: Record<string, unknown>,
  fallback: string
): string {
  return String(
    data.errorMessage ||
      data.errorMessageEnglish ||
      data.ResponseDescription ||
      data.ResultDesc ||
      data.httpStatusText ||
      fallback
  );
}

export function getMpesaBaseUrl(): string {
  if (process.env.MPESA_BASE_URL) return process.env.MPESA_BASE_URL;
  return process.env.MPESA_ENV === "production" ? PRODUCTION_BASE : SANDBOX_BASE;
}

export function isMpesaConfigured(): boolean {
  try {
    getMpesaConfig();
    return true;
  } catch {
    return false;
  }
}

export function getMpesaConfig(): MpesaConfig {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  if (!consumerKey || !consumerSecret || !shortcode || !passkey || !callbackUrl) {
    throw new Error(
      "M-Pesa is not configured. Set MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, and MPESA_CALLBACK_URL."
    );
  }

  return {
    consumerKey,
    consumerSecret,
    shortcode,
    passkey,
    callbackUrl,
    transactionType:
      process.env.MPESA_TRANSACTION_TYPE || "CustomerPayBillOnline",
    partyB: process.env.MPESA_PARTY_B || shortcode,
  };
}

/** Safaricom requires YYYYMMDDHHmmss in East Africa Time (UTC+3). */
export function getKenyaTimestamp(): string {
  const formatter = new Intl.DateTimeFormat("en-KE", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  return `${get("year")}${get("month")}${get("day")}${get("hour")}${get("minute")}${get("second")}`;
}

export function formatKenyaPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.startsWith("7") || digits.startsWith("1")) return "254" + digits;
  throw new Error("Invalid Kenyan phone number");
}

function buildPassword(shortcode: string, passkey: string, timestamp: string): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}

export async function getMpesaToken(): Promise<string> {
  const { consumerKey, consumerSecret } = getMpesaConfig();
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const base = getMpesaBaseUrl();

  const response = await fetch(
    `${base}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store",
    }
  );

  const data = (await readMpesaResponse(response)) as {
    access_token?: string;
    errorMessage?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(
      mpesaErrorMessage(data, "Failed to obtain M-Pesa access token")
    );
  }

  return data.access_token;
}

export async function initiateStkPush(
  phone: string,
  amount: number,
  reference: string
): Promise<StkPushResult> {
  const config = getMpesaConfig();
  const token = await getMpesaToken();
  const formattedPhone = formatKenyaPhone(phone);
  const timestamp = getKenyaTimestamp();
  const password = buildPassword(config.shortcode, config.passkey, timestamp);
  const base = getMpesaBaseUrl();

  const body = {
    BusinessShortCode: config.shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: config.transactionType,
    Amount: Math.round(amount),
    PartyA: formattedPhone,
    PartyB: config.partyB || config.shortcode,
    PhoneNumber: formattedPhone,
    CallBackURL: config.callbackUrl,
    AccountReference: reference.slice(0, 12),
    TransactionDesc: "SCDS Enrollment".slice(0, 13),
  };

  const response = await fetch(`${base}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await readMpesaResponse(response);

  if (!response.ok || data.errorMessage) {
    return {
      success: false,
      errorMessage: mpesaErrorMessage(data, "M-Pesa STK Push failed"),
      raw: data,
    };
  }

  const responseCode = String(data.ResponseCode ?? "");
  const success = responseCode === "0";

  return {
    success,
    responseCode,
    responseDescription: String(data.ResponseDescription ?? ""),
    customerMessage: String(data.CustomerMessage ?? ""),
    merchantRequestId: String(data.MerchantRequestID ?? ""),
    checkoutRequestId: String(data.CheckoutRequestID ?? ""),
    errorMessage: success
      ? undefined
      : mpesaErrorMessage(data, "STK Push failed"),
    raw: data,
  };
}

export async function queryStkPushStatus(
  checkoutRequestId: string
): Promise<StkQueryResult> {
  const config = getMpesaConfig();
  const token = await getMpesaToken();
  const timestamp = getKenyaTimestamp();
  const password = buildPassword(config.shortcode, config.passkey, timestamp);
  const base = getMpesaBaseUrl();

  const response = await fetch(`${base}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: config.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }),
  });

  const data = await readMpesaResponse(response);

  if (!response.ok || data.errorMessage) {
    return {
      success: false,
      resultDesc: mpesaErrorMessage(data, "Failed to query M-Pesa payment status"),
      raw: data,
    };
  }

  const resultCode = String(data.ResultCode ?? "");
  return {
    success: resultCode === "0",
    resultCode,
    resultDesc: String(data.ResultDesc ?? ""),
    raw: data,
  };
}
