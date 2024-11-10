import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest, context: { params: Promise<{ store: string, payload: string }> }) {
    try {
        const { store, payload } = await context.params;
        const body = await request.json();

        const responseBody = {
            id: body.id,
            metadata: body.metadata,
            content: body.content,
            media: body.media,
            embedding: body.embedding
        };

        const filePath = path.join(process.cwd(), 'collections', 'vector_store', 'payload.jsonl');
        const configPath = path.join(process.cwd(), 'collections', 'vector_store', 'config.json');

        // Check if config.json exists
        try {
            await fs.access(filePath);
            // If config.json exists, append the payload
            const payloadData = JSON.stringify(responseBody);
            await fs.appendFile(filePath, `\n${payloadData}`);
        } catch (error) {
            // If config.json does not exist, write the payload as a new file
            await fs.writeFile(filePath, JSON.stringify(responseBody));
        }

        return NextResponse.json({
            message: `got vectorstore ${store} created successfully with payload ${payload}`,
            body: responseBody
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to return store' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest, context: { params: Promise<{ store: string, payload: string }> }) {
    console.log("get received"); 
    const { store, payload } = await context.params;
    const vectorName = store;
    if (!vectorName) {
        return NextResponse.json(
            { error: 'vectorName parameter is required' },
            { status: 400 }
        );
    }

    const vectorPath = path.join(process.cwd(), 'collections', vectorName, 'payload.jsonl');
    console.log(`Vector path: ${vectorPath}`);
    try {
        const points: any[] = [];

        // Check if the vector store file exists
        try {
            await fs.access(vectorPath);
        } catch (error) {
            console.warn(`Vector store file does not exist: ${vectorName}`);
            return NextResponse.json(points);
        }

        // Read the file line by line
        const fileContent = await fs.readFile(vectorPath, 'utf8');
        const lines = fileContent.split('\n');

        for (const line of lines) {
            if (line.trim()) {
                try {
                    const pointMap = JSON.parse(line);
                    console.log(`Point map: ${JSON.stringify(pointMap)}`);
                    const id = pointMap.id;
                    const content = pointMap.content;
                    const vectorValues = pointMap.vector;
                    const metadata = pointMap.metadata;
                    const embedding = pointMap.embedding;

                    // Convert List<Number> to float[]
                    let vector = null;
                    if (vectorValues) {
                        vector = vectorValues.map((value: number) => value);
                    }

                    // Create Point object
                    const point = { id, content, vector, metadata,embedding };
                    points.push(point);
                } catch (error) {
                    console.error(`Failed to parse point from line: ${line}. Error: ${error.message}`);
                }
            }
        }

        return NextResponse.json(points);
    } catch (error) {
        console.error(`Error while fetching points for vector store ${vectorName}: ${error.message}`);
        return NextResponse.json(
            { error: 'Failed to read points from vector store' },
            { status: 500 }
        );
    }
}