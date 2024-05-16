import { NextRequest, NextResponse } from 'next/server';

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
    console.log("server response2: ", json);
    // console.log("server response: ", JSON.stringify(res.json()));
//    return res.json();
    return NextResponse.json(json)

}


