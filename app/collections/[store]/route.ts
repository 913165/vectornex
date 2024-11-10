import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest, context: { params: Promise<{ store: string }> }) {
    try {
        const { store } = await context.params;
        const body = await request.json();

        const collectionsDir = path.resolve('collections'); 
        const configDir = path.resolve('config'); 
        const storeDir1 = path.join(collectionsDir, store);
        await fs.mkdir(storeDir1, { recursive: true });
        const storeDir2 = path.join(configDir, store);
        await fs.mkdir(storeDir2, { recursive: true });
        const configFilePath = path.join(storeDir2, 'config.json');
        await fs.writeFile(configFilePath, JSON.stringify(body, null, 2));
        const payloadFilePath = path.join(storeDir1, 'payload.jsonl');
        return NextResponse.json({
            message: `Directory ${store} created successfully`,
            body: body
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to return store' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ store: string }> }) {
    try {
        const { store } = await context.params;

        const collectionsDir = path.resolve('collections'); 
        const configDir = path.resolve('config'); 
        const storeDir1 = path.join(collectionsDir, store);
        const storeDir2 = path.join(configDir, store);

        // Delete the store directories
        await fs.rm(storeDir1, { recursive: true, force: true });
        await fs.rm(storeDir2, { recursive: true, force: true });

        return NextResponse.json({
            message: `Directory ${store} deleted successfully`
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete store' },
            { status: 500 }
        );
    }
}   
