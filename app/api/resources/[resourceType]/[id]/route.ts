import { auth } from "@/app/api/auth/auth";
import { db } from "@/app/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { resourcesMap, getResource } from "../../resourceTypes";
import { sql } from "drizzle-orm";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ resourceType: string, id: number }> }) {
    try {
        let f = await auth()
        const { resourceType, id } = await params
        const resource = getResource(resourceType)
        let body = await request.json()
        let update = await db.update(resource).set(body).where(sql`id=${id}`).execute()
        if (update.rowCount === 0)
            return NextResponse.json({ error: "resource not found to updated" }, { status: 404 })
        return NextResponse.json(null, { status: 200 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resourceType: string, id: number }> }) {
    try {
        let f = await auth()
        const { resourceType, id } = await params
        const resource = getResource(resourceType)
        let deleteRes = await db.delete(resource).where(sql`id=${id}`).execute()
        if (deleteRes.rowCount === 0)
            return NextResponse.json({ error: "resource not found to deleted" }, { status: 404 })
        return NextResponse.json(null, { status: 200 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}