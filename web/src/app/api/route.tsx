import { NextRequest, NextResponse } from 'next/server';
const pinataSDK = require('@pinata/sdk');

type Params = {
    ipfsURL: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const url = request.nextUrl.searchParams.get('ipfsURL');

    console.log("server requesting url: ", url)
    if (!url || url === "undefined") {
      return NextResponse.json({});
      // throw new Error('Failed to fetch data')
    }
    console.log('fetching: ', url)
    const res = await fetch(url as string);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
      // return NextResponse.error()
    }

    const json = await res.json();

    // console.log("server response: ", JSON.stringify(await res.body));
    // console.log("server response2: ", json);
    // console.log("server response: ", JSON.stringify(res.json()));
//    return res.json();





    return NextResponse.json(json)

}

export async function POST(request: NextRequest, context: { params: Params }) {
// console.log("server requesting url: ", JSON.stringify(await request.json()))
// console.log("server requesting params: ", params)

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
// const res = await pinata.testAuthentication()
// console.log(res)

const input = await request.json()
// console.log(JSON.stringify(input))

const payload = {
  name: input.name,
  description: input.description,
  gameUrl: input.gameUrl
};

// console.log(JSON.stringify(wat))




const options = {
  pinataMetadata: {
      name: payload.name.length > 0 ? payload.name : "Empty Game Metadata",
      // keyvalues: {
      //     customKey: 'customValue',
      //     customKey2: 'customValue2'
      // }
  },
  pinataOptions: {
      cidVersion: 0
  }
};
const res = await pinata.pinJSONToIPFS(payload, options)
// const resJSON = await res.json()
// console.log(res)







return NextResponse.json(res)


}


