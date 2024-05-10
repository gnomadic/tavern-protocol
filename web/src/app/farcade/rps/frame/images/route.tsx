import { NextRequest, NextResponse } from 'next/server';

import { ImageResponse } from 'next/og';
import WelcomeRPS from './WelcomeRPS';
import ModulesImage from '../../framex/ModulesImage';
import StepsImage from '../../framex/StepsImage';
import CTAImage from '../../framex/CTAImage';
import NameImage from '../../framex/NameImage';

export async function GET(request: NextRequest) {

    return new ImageResponse((
      <WelcomeRPS
      titleFirst="come play"
      titleSecond="ROCK PAPER SCISSORS"
      rowOneFirst="at the"
      rowOneSecond="farcade"
      rowTwoFirst="built on-chain with the"
      rowTwoSecond="tavern"
      />), { width: 1150, height: 620 });





  // const currentPage = request.nextUrl.searchParams.get('page');
  // if (!currentPage) {
  //   return new NextResponse('Pass in a page as a parameter', { status: 400 });
  // }

  // if (currentPage === "one") {
  //   return new ImageResponse((
  //     <WelcomeRPS />), { width: 1200, height: 630 });
  // } else if (currentPage === "two") {
  //   return new ImageResponse((
  //     <ModulesImage />), { width: 1200, height: 630 });
  // } else if (currentPage === "three") {
  //   return new ImageResponse((
  //     <StepsImage />), { width: 1200, height: 630 });
  // } else if (currentPage === "four") {
  //   return new ImageResponse((
  //     <NameImage />), { width: 1200, height: 630 });
  // } else if (currentPage === "five") {
  //   return new ImageResponse((
  //     <CTAImage />), { width: 1200, height: 630 });
  // }
  // return new NextResponse(null, { status: 204, statusText: 'Page does not exist' });
}