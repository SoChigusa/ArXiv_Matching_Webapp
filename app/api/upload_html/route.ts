// app/api/upload_html/route.ts
import { NextResponse } from 'next/server';

type Cache = {
  [key: string]: { html: string[], numContents: number };
};

const cache: Cache = {};

export async function POST(request: Request) {
  const data = await request.json();
  const { userId, html, numContents } = data;
  cache[userId] = { html, numContents };
  return NextResponse.json({ status: 'success' });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || '';
  const index = parseInt(searchParams.get('index') || '0', 10);
  const content = cache[userId]?.html[index] || '';
  return NextResponse.json({ html: content, index, numContents: cache[userId]?.numConte });
}
