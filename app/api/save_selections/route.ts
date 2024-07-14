// app/api/save-selections/route.ts
import { NextResponse } from 'next/server';

type Cache = {
  [key: string]: { html: string[], selections: number[] };
};

const cache: Cache = {};

export async function POST(request: Request) {
  const data = await request.json();
  const { userId, selections } = data;

  // Initialize the cache for the userId if it doesn't exist
  if (!cache[userId]) {
    cache[userId] = { html: [], selections: [] };
  }

  // Update the selections for the userId
  cache[userId].selections = selections;

  return NextResponse.json({ status: 'success' });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || '';
  const selections = cache[userId]?.selections || [];
  return NextResponse.json({ selections });
}