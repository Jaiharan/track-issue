import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(request: NextRequest) {
  const { id, status } = await request.json();

  if (!status) {
    return NextResponse.json(
      { error: "Status field is required" },
      { status: 400 }
    );
  }

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update issue status" },
      { status: 500 }
    );
  }
}
