import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';




export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received webhook request:", body);

    const price = body.queryResult.parameters.price;
    const city = body.queryResult.parameters['geo-city'];
    const query = body.queryResult.queryText;

    const webhookResponse = {
      fulfillmentMessages: [
        {
          text: {
            text: [`I found properties in ${city} with a price of ${price}. Is there anything specific you're looking for?`]
          }
        }
      ],
      payload: {
        price,
        city,
        query
      }
    };

    console.log("Sending webhook response:", webhookResponse);

    return NextResponse.json(webhookResponse);
  }
  catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({
      fulfillmentText: "Sorry, there was an error processing your request."
    }, { status: 500 });
  }
}

