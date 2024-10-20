import { NextResponse } from "next/server";


export  async function POST(req:any, res:any) {
      // Extract data from the request body
        console.log(await req.json());
        
        const data=await req.json();
        const price=data.queryResult.parameters.price;
        const city=data.queryResult.parameters['geo-city'];
        const message=data.queryResult.fulfillmentText;
        const query=data.queryResult.queryText;
        console.log(price);
        console.log(city);

      // Send a success response
      return NextResponse.json({
        message:message,
        query:query,
        data:{
            price,
            city
        }
    })
  }

  export async function GET(req:any,res:any){
    return NextResponse.json({
        message:"hello world"
    })
  }
  