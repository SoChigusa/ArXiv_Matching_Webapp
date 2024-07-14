// app/api/notify-completion/route.ts
import { NextResponse } from 'next/server';

type CompletionCache = {
  [key: string]: boolean;
};

const completionCache: CompletionCache = {};

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = data;
  completionCache[userId] = true;
  return NextResponse.json({ status: 'success' });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || '';
  const status = completionCache[userId] ? 'completed' : 'pending';
  return NextResponse.json({ status });
}
