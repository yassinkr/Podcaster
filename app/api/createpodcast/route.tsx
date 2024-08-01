import { NextResponse } from 'next/server';
import { insertPodcast } from '@/server/db';
import {auth } from '@clerk/nextjs/server';

export async function POST(req: { json: () => any; }) {
  const body = await req.json();
  const { podcastTitle, description, podcastURL, imageURL } = body;
 
  try {
    const { userId } = auth();
    const podcast = await insertPodcast({
      title: podcastTitle,
      description,
      audioURL: podcastURL,
      imageURL,
      userId,
    });
    return NextResponse.json(podcast);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create podcast' }, { status: 500 });
  }
}
