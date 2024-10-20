import { NextResponse } from "next/server";


export  async function POST(req:any, res:any) {
      // Extract data from the request body
        console.log(req.json());
      
      // Send a success response
      return NextResponse.json({
        message:"hello world"
    })
   
  }

  export async function GET(req:any,res:any){
    return NextResponse.json({
        message:"hello world"
    })
  }
  