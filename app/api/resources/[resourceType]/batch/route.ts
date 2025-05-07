import { auth } from "@/app/auth";
import { db } from "@/app/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { resourcesMap, getResource } from "../../resourceTypes";
import { sql } from "drizzle-orm";
import { resolve } from "path";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ resourceType: string }> }) {
    try {
        let f = await auth()
        const { resourceType } = await params
        const resource = getResource(resourceType)
        let body: any[] = await request.json()
        let res = []
        for (let i = 0; i < body.length; i++) {
            let id = body[i].id
            try {
                let update = await db.update(resource).set(body[i]).where(sql`id=${id}`).execute()
                if (update.rowCount === 0)
                    res.push({ error: `resource with id ${id} not found to update` })
            } catch (e: any) {
                res.push({ error: e.message })
            }
        }
        if (res.length === 0)
            return NextResponse.json(null, { status: 200 })
        return NextResponse.json(res, { status: 500 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resourceType: string }> }) {
    try {
        let f = await auth()
        const { resourceType } = await params
        const resource = getResource(resourceType)
        let ids: number[] = await request.json()
        let res = []
        for (let i = 0; i < ids.length; i++) {
            try {
                let id = ids[i]
                let deleteRes = await db.delete(resource).where(sql`id=${id}`).execute()
                if (deleteRes.rowCount === 0)
                    res.push({ error: `resource with id ${id} not found to delete` })
            } catch (e: any) {
                res.push({ error: e.message })
            }
        }
        if (res.length === 0)
            return NextResponse.json(null, { status: 200 })
        return NextResponse.json(resolve, { status: 500 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}