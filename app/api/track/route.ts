import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "8.8.8.8";

    const now = new Date();

    // Look up existing visitor
    const existing = await prisma.visitor.findUnique({
      where: { ip },
    });

    if (existing) {
      const lastVisit =
        existing.visitedAt.length > 0
          ? existing.visitedAt[existing.visitedAt.length - 1]
          : null;

      if (lastVisit) {
        const diffMinutes =
          (now.getTime() - new Date(lastVisit).getTime()) /
          (1000 * 60);

        // ⏱ Only push timestamp if >= 5 minutes
        if (diffMinutes < 1) {
          return NextResponse.json({
            skipped: true,
            message: "Visit within 5 minutes ignored",
          });
        }
      }

      const updated = await prisma.visitor.update({
        where: { ip },
        data: {
          visitedAt: {
            push: now,
          },
        },
      });

      return NextResponse.json({
        updated: true,
        visitor: updated,
      });
    }

    const { data } = await axios.get(
      `http://ip-api.com/json/${ip}`
    );

    const visitor = await prisma.visitor.create({
      data: {
        ip,
        city: data.city,
        region: data.regionName,
        country: data.country,
        latitude: data.lat,
        longitude: data.lon,
        isp: data.isp,
        visitedAt: [now],
      },
    });

    return NextResponse.json({
      created: true,
      visitor,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Tracking failed" },
      { status: 500 }
    );
  }
}
