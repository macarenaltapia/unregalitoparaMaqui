import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { CONTRIBUTIONS_TABLE } from "@/data/config";

export async function GET() {
  const { data, error } = await supabase
    .from(CONTRIBUTIONS_TABLE)
    .select("name, message, amount, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const total = data.reduce((sum, row) => sum + (row.amount || 0), 0);
  const messages = data
    .filter((row) => row.message && row.message.trim() !== "")
    .map(({ name, message, created_at }) => ({ name, message, created_at }));

  return NextResponse.json({ total, messages });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, amount, message } = body;

  if (!name || !amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json(
      { error: "Nombre y monto son requeridos" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from(CONTRIBUTIONS_TABLE).insert({
    name: name.trim(),
    amount: Math.round(amount),
    message: message?.trim() || "",
    transferred: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
