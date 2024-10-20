import { NextApiRequest, NextApiResponse } from "next";
import { SessionsClient } from "@google-cloud/dialogflow";
import { NextResponse } from "next/server";
import path from "path";

const PROJECT_ID = process.env.DIALOGFLOW_PROJECT_ID;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

console.log(PROJECT_ID);
console.log(GOOGLE_APPLICATION_CREDENTIALS);


if (!PROJECT_ID || !GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("Missing Dialogflow credentials in environment variables");
}

const KEY_PATH = path.join(process.cwd(),GOOGLE_APPLICATION_CREDENTIALS);


const sessionClient = new SessionsClient({
  keyFilename: KEY_PATH,
});


export async function GET(req:any,res:any){
  return NextResponse.json({
    message:"dialogflow"
  })
}

export  async function POST(req: any, res: any) {
    const { query } = await req.json();
    console.log(query);

    if (!query) {
      return NextResponse.json({ error: "Query is required" });
    }

    const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID!, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: "en-US",
        },
      },
    };

    try {
      const [response] = await sessionClient.detectIntent(request);
      const result = response.queryResult;
      console.log(result);
      return NextResponse.json(result);
    } catch (error) {
      console.error("Dialogflow error:", error);
      return NextResponse.json({ error: "Internal server error" });
    }

}