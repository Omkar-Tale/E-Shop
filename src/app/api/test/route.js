import { connectDB } from "@/lib/connectDatabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "Database Connected Successfully!",
    });
  } catch (error) {
    console.error("API Error", {
      message: error.message,
      stack: error.stack,
    });
}
}
