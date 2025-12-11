import prisma from "@/lib/prisma";
import { NextRequest , NextResponse} from "next/server";

export async function POST(req: NextRequest) {

    try {
        const visitors = await prisma.visitor.findMany({
            orderBy: { ip: "asc" },
        });

      return NextResponse.json({
        visitors,
      });
      
    }catch(error){
    return NextResponse.json(
      { error: "Tracking failed" },
      { status: 500 }
    );
    }
}