import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { paths } = await request.json();
    if (!Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ error: 'paths array required' }, { status: 400 });
    }
    for (const path of paths) {
      revalidatePath(path);
    }
    return NextResponse.json({ revalidated: true, paths });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
