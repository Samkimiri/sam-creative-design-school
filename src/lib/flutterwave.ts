import { createHash } from "crypto";

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";

export interface FlutterwaveConfig {
  secretKey: string;
  currency: string;
}

export interface FlutterwaveCheckoutInput {
  amount: number;
  txRef: string;
  redirectUrl: string;
  customer: {
    email: string;
    name: string;
    phone: string;
  };
  courseName: string;
}

export interface FlutterwaveCheckoutResult {
  success: boolean;
  link?: string;
  message?: string;
  raw?: Record<string, unknown>;
}

export interface FlutterwaveVerification {
  success: boolean;
  status?: string;
  txRef?: string;
  transactionId?: string;
  flwRef?: string;
  amount?: number;
  chargedAmount?: number;
  currency?: string;
  paymentType?: string;
  customerEmail?: string;
  message?: string;
  raw?: Record<string, unknown>;
}

function readConfig(): FlutterwaveConfig {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  const currency = process.env.FLUTTERWAVE_CURRENCY || "KES";

  if (!secretKey) {
    throw new Error("Flutterwave is not configured. Set FLUTTERWAVE_SECRET_KEY.");
  }

  return { secretKey, currency };
}

export function isFlutterwaveConfigured(): boolean {
  try {
    readConfig();
    return true;
  } catch {
    return false;
  }
}

async function readFlutterwaveResponse(response: Response) {
  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(
      String(data.message || `Flutterwave API returned HTTP ${response.status}`)
    );
  }
  return data;
}

export function getFlutterwaveCurrency() {
  return process.env.FLUTTERWAVE_CURRENCY || "KES";
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function shouldIncludePayloadHash() {
  return process.env.FLUTTERWAVE_DISABLE_PAYLOAD_HASH !== "true";
}

function createPayloadHash(input: FlutterwaveCheckoutInput, currency: string) {
  const amount = String(Math.round(input.amount));
  const hashedSecret = sha256(readConfig().secretKey);
  return sha256(`${amount}${currency}${input.customer.email}${input.txRef}${hashedSecret}`);
}

function readNestedString(value: unknown, key: string) {
  if (!value || typeof value !== "object") return "";
  const nested = value as Record<string, unknown>;
  return String(nested[key] || "");
}

function normalizeVerification(
  data: Record<string, unknown>,
  fallbackTransactionId = ""
): FlutterwaveVerification {
  const tx = data.data as Record<string, unknown> | undefined;

  if (!tx) {
    return {
      success: false,
      message: "Flutterwave transaction was not found.",
      raw: data,
    };
  }

  const status = String(tx.status || "");
  const amount = Number(tx.amount || 0);
  const chargedAmount = Number(tx.charged_amount || tx.amount || 0);

  return {
    success: data.status === "success" && status === "successful",
    status,
    txRef: String(tx.tx_ref || ""),
    transactionId: String(tx.id || fallbackTransactionId),
    flwRef: String(tx.flw_ref || ""),
    amount,
    chargedAmount,
    currency: String(tx.currency || ""),
    paymentType: String(tx.payment_type || ""),
    customerEmail: readNestedString(tx.customer, "email"),
    message: String(data.message || ""),
    raw: data,
  };
}

export async function createFlutterwaveCheckout(
  input: FlutterwaveCheckoutInput
): Promise<FlutterwaveCheckoutResult> {
  try {
    const config = readConfig();
    const amount = Math.round(input.amount);
    const payload: Record<string, unknown> = {
      tx_ref: input.txRef,
      amount,
      currency: config.currency,
      redirect_url: input.redirectUrl,
      customer: {
        email: input.customer.email,
        phonenumber: input.customer.phone,
        name: input.customer.name,
      },
      customizations: {
        title: process.env.FLUTTERWAVE_TITLE || "Sam Creative Design School",
        description: input.courseName,
        logo: process.env.FLUTTERWAVE_LOGO_URL || undefined,
      },
      payment_options: process.env.FLUTTERWAVE_PAYMENT_OPTIONS || "card,mobilemoney,banktransfer",
      meta: {
        reference: input.txRef,
        courseName: input.courseName,
      },
    };

    if (shouldIncludePayloadHash()) {
      payload.payload_hash = createPayloadHash(input, config.currency);
    }

    const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await readFlutterwaveResponse(response);
    const checkoutData = data.data as { link?: string } | undefined;

    if (data.status !== "success" || !checkoutData?.link) {
      return {
        success: false,
        message: String(data.message || "Flutterwave checkout link was not created."),
        raw: data,
      };
    }

    return {
      success: true,
      link: checkoutData.link,
      message: String(data.message || "Flutterwave checkout created."),
      raw: data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Flutterwave checkout could not be created.",
    };
  }
}

export async function verifyFlutterwaveTransaction(
  transactionId: string
): Promise<FlutterwaveVerification> {
  try {
    const config = readConfig();
    const response = await fetch(
      `${FLUTTERWAVE_BASE_URL}/transactions/${encodeURIComponent(transactionId)}/verify`,
      {
        headers: {
          Authorization: `Bearer ${config.secretKey}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await readFlutterwaveResponse(response);
    return normalizeVerification(data, transactionId);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Flutterwave verification failed.",
    };
  }
}

export async function verifyFlutterwaveTransactionByReference(
  txRef: string
): Promise<FlutterwaveVerification> {
  try {
    const config = readConfig();
    const url = new URL(`${FLUTTERWAVE_BASE_URL}/transactions/verify_by_reference`);
    url.searchParams.set("tx_ref", txRef);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await readFlutterwaveResponse(response);
    return normalizeVerification(data);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Flutterwave verification failed.",
    };
  }
}
