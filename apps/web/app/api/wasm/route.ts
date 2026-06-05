import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {

  try {
    // Resolve WASM path: works in both dev (cwd=apps/web) and standalone (cwd=app root)
    const candidates = [
      path.resolve(process.cwd(), 'packages/engine/dist/processor.wasm'),       // standalone
      path.resolve(process.cwd(), '../../packages/engine/dist/processor.wasm'),   // dev
    ];
    const wasmPath = candidates.find(p => fs.existsSync(p)) ?? candidates[0];
    
    // In a real environment, you'd use a ReadableStream for large files, 
    // but Next.js NextResponse can accept a Node ReadStream or raw buffer.
    const fileBuffer = await fs.promises.readFile(wasmPath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/wasm',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Failed to load WASM engine:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
