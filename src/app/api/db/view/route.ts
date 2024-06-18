import { viewTable } from "@/lib/seed";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const table = await viewTable();
    return NextResponse.json({
      status: 200,
      message: table,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}