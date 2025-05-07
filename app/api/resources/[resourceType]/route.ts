import { auth } from "@/app/auth";
import { db } from "@/app/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { resourcesMap, getResource } from "../resourceTypes";

export async function GET(request: NextRequest, { params }: { params: Promise<{ resourceType: string }> }) {
    try {
        let f = await auth()
        // const { searchParams } = new URL(request.url);
        // const paramValue = searchParams.get('id');
        const resource = getResource((await params).resourceType)
        let getAll = await db.select().from(resource).execute()
        return NextResponse.json(getAll, { status: 200 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resourceType: string }> }) {
    try {
        let f = await auth()
        const resource = getResource((await params).resourceType)
        let insert = await db.insert(resource).values(await request.json()).execute()
        return NextResponse.json(insert, { status: 200 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
