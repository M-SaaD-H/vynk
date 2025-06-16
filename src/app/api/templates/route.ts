import { ApiResponse } from "@/lib/apiResponse";
import { connectToDB } from "@/lib/db"
import { Template } from "@/models/template.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const templates = await Template.find({}).lean();

    if(!templates || templates.length === 0) {
      return NextResponse.json(
        new ApiResponse(404, null, 'No Templates found'),
        { status: 404 }
      )
    }

    return NextResponse.json(
      new ApiResponse(200, { templates }, 'Templates fetched successfully'),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error while fetching templates E:', error);
    return NextResponse.json(
      new ApiResponse(501, null, (error as Error).message),
      { status: 501 }
    )
  }
}