import { NextApiRequest, NextApiResponse } from "next";
import { SessionsClient } from "@google-cloud/dialogflow";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';
import os from 'os';

const PROJECT_ID = process.env.DIALOGFLOW_PROJECT_ID;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS || "";


if (!PROJECT_ID || !GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("Missing Dialogflow credentials in environment variables");
}


function getCredentialsPath() {
  const credentialsJson = Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('utf8');
  const tempFilePath = path.join(os.tmpdir(), 'google-credentials-temp.json');
  fs.writeFileSync(tempFilePath, credentialsJson);
  return tempFilePath;
}

const credentialsPath = getCredentialsPath();



const sessionClient = new SessionsClient({
  keyFilename: credentialsPath,
});


export async function GET(req:any,res:any){
  return NextResponse.json({
    message:"dialogflow"
  })
}

export  async function POST(req: any, res: any) {
    const body = await req.json();
    console.log(body);
    const query=body.query;

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
      console.log(response);
      const result = response.queryResult;
      return NextResponse.json(result,{status:200});
    } catch (error) {
      console.error("Dialogflow error:", error);
      return NextResponse.json({ error: "Internal server error" },{status:500});
    }

}