import { ACTION_HELLO, GameSummary, QUERY_ACTION, QUERY_GAME } from "@/domain/Domain";
import { FrameButtonMetadata, getFrameHtmlResponse, getFrameMessage, FrameInputMetadata } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { getBlockNumber, getGameSummary } from "@/services/viemService";
import { Address } from "viem";

const postURL = `${process.env.NEXT_PUBLIC_URL}/intro/frame?page=`;
  const imageURL = `${process.env.NEXT_PUBLIC_URL}/intro/frame/images?page=`;


export async function POST(
  request: NextRequest,
) {

  const page = request.nextUrl.searchParams.get('page');

  let newPage = '';
  if (page === 'one') {
    newPage = 'two';
  }else if (page === 'two') {
    newPage = 'three';
  }else if (page === 'three') {
    newPage = 'one';
  }

  let lastPage = '';
   if (newPage === 'two') {
    lastPage = 'one';
  } else if (newPage === 'three') {
    lastPage = 'two';
  }

  let nextButton : FrameButtonMetadata = 
    {
      action: "post",
      label: "next",
      target: `${postURL}${newPage}`,
    }

    let lastButton : FrameButtonMetadata =
    {
      action: "post",
      label: "previous",
      target: `${postURL}${lastPage}`,
    }

    

    let firstButton;
    //first button is next on page one
    // and back on page two and three

    if (page === 'one') {
      firstButton = nextButton;
    }else{
      firstButton = lastButton;
    }
    const secondButton = [];
    // second button doesn't exist on page one
    // and is next on page two and three
    if (page !== 'one') {
      secondButton.push(nextButton)
    }



    const previous = []

    if (lastPage !== '')  {
      previous.push(lastButton)
    }


    let input : FrameInputMetadata = {text: "hello"};




  return new NextResponse(getFrameHtmlResponse({
    buttons:[firstButton, ...secondButton],
    image: `${imageURL}${page}`,
    input: {text:"hello"},
    
    // postUrl: `${process.env.NEXT_PUBLIC_URL}/game/11155111/0xd362776F706b8E72525e3291e5433A695ECBefA7/frame`,
  }),);

  // if (action === ACTION_HELLO){
  // return new ImageResponse((
  //     <div style={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       backgroundColor: 'black',
  //       width: '100%',
  //       height: '100%',
  //       padding: '20px',
  //       justifyContent: 'center'
  //     }}>
  //       <div style={{fontSize: "48px", color: "white", marginBottom: '10px'}}>Mint an NFT and Claim Your Reward</div>
  //       <div style={{fontSize: "24px", color: "white"}}>Click below to check if you&apos;re eligible and then mint and
  //         claim!
  //       </div>
  //     </div>
  //   ), {width: 600, height: 400});
  // }
}



// export async function GET(
//   request: NextRequest,
//   { params }: { params: { chainid: string, address: string } }
// ) {
//   const action = request.nextUrl.searchParams.get('action');
//   if (!action) {
//     return new NextResponse("error: Action required to generate image!", { status: 400 });
//   }


// }


