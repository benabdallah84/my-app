import { MongoClient } from "mongodb";

async function hundler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://slimane47:berriane47@cluster0.tjypi.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
      console.log(result);
      client.close();

      res.status(201).json({ message: "meetup inserted!" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default hundler;
