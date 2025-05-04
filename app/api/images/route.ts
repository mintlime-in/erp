import { pool } from "@/app/db/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const name = request.nextUrl.searchParams.get('name')
    try {
        const result = await pool.query("SELECT data FROM erp.images WHERE name = $1", [name]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return new NextResponse(result.rows[0].data, {
            status: 200,
            headers: { "Content-Type": "image/jpeg" },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error reading image' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const image = formData.get('image') as Blob;

    if (!name || !image) {
        return NextResponse.json({ error: 'Name and image are required' }, { status: 400 });
    }

    try {
        const buffer = Buffer.from(await image.arrayBuffer());

        await pool.query("INSERT INTO images (name, data) VALUES ($1, $2)", [name, buffer]);

        return NextResponse.json({ info: "Image uploaded successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }
}