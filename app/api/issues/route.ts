import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  // Perform a database query to get the data
  const issues = await prisma.issue.findMany();

  // Check if data was retrieved successfully
  if (!issues) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }

  // Return the retrieved data
  return NextResponse.json(issues, { status: 200 });
}