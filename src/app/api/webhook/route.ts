import { NextResponse } from "next/server";


export  async function POST(req:any, res:any) {
        const data=await req.json();
        console.log(data);
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
  