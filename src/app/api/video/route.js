import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("StreamVista");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let response = await db.collection("video").insertOne(bodyObject);
      res.json(response.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("video").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}