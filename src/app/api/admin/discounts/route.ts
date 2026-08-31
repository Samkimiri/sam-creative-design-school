import { NextResponse } from "next/server";
import { getDiscountSettings, saveDiscountSettings } from "@/lib/discountSettings";
import { requireFullAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const discounts = await getDiscountSettings();
  return NextResponse.json({ success: true, data: { discounts } });
}

export async function PATCH(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const discounts = await saveDiscountSettings(auth.body.discounts || auth.body);
  return NextResponse.json({ success: true, data: { discounts } });
}

