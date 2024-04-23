import { NextRequest, NextResponse } from 'next/server';

import { ImageResponse } from 'next/og';
import PageOne from '../FirstImage';
import PageTwo from '../SecondImage';
import PageThree from '../ThirdImage';

export async function GET(request: NextRequest) {
  const currentPage = request.nextUrl.searchParams.get('page');
  if (!currentPage) {
    return new NextResponse('Pass in a page as a parameter', { status: 400 });
  }

  if (currentPage === "one") {
    return new ImageResponse((
      <PageOne />), { width: 1200, height: 630 });
  } else if (currentPage === "two") {
    return new ImageResponse((
      <PageTwo />), { width: 1200, height: 630 });
  } else if (currentPage === "three") {
    return new ImageResponse((
      <PageThree />), { width: 1200, height: 630 });

  }
  return new NextResponse(null, { status: 204, statusText: 'Page does not exist' });
}