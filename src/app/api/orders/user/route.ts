import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { connectToDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { Template } from "@/models/template.model";
import { ApiResponse } from "@/lib/apiResponse";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        new ApiResponse(401, null, 'Unauthorized request'),
        { status: 401 }
      )
    }

    await connectToDB();

    const orders = await Order.find({ userId: session.user._id, status: 'completed' })
      .populate({
        path: 'templateId',
        select: 'title price images liveLink',
        model: Template,
        options: { strictPopulate: false }
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      new ApiResponse(200, { orders }, 'Orders fetched successfully'),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching orders E:', error);
    return NextResponse.json(
      new ApiResponse(500, null, 'Error while fetching orders'),
      { status: 500 }
    )
  }
}