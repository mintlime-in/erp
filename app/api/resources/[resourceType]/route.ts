import { auth } from "@/app/auth";
import { db } from "@/app/db/drizzle";
import { imagesInErp, rolesInErp, usersInErp } from "@/app/db/schemas/erp";
import { NextRequest, NextResponse } from "next/server";

const resourcesMap = new Map<string, any>()
resourcesMap.set("roles", rolesInErp)
resourcesMap.set("users", usersInErp)
resourcesMap.set("images", imagesInErp)


function getResource(resourceType: string) {
    let resource = resourcesMap.get(resourceType)
    if (!resource) {
        throw new Error(`Resource type ${resourceType} not found`)
    }
    return resource
}

export async function GET(request: NextRequest, { params }: { params: { resourceType: string } }) {
    try {
        let f = await auth()
        const { resourceType } = await params
        const resource = getResource(resourceType)
        let getAll = await db.select().from(resource).execute()
        return NextResponse
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }

}