// video/route.js

import clientPromise from "@/lib/db/index";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("StreamVista");
    const bodyObject = req.body;
    const response = await db.collection("video").insertOne(bodyObject);
    return  NextResponse.json(response);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.status(500).json({ error: "Internal Server Error" });
  }
}

export async function GET(req, res, db) {
  try {
    const client = await clientPromise;
    const db = client.db("StreamVista");
    const allVideo = await db.collection("video").find({}).toArray();
    return  NextResponse.json({ status: 200, data: allVideo });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return  NextResponse.status(500).json({ error: "Internal Server Error" });
  }
}
