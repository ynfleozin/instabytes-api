import { MongoClient } from "mongodb";

export default async function connectDB(connectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectionString);
        console.log("Connecting to cluster of database...");
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB Atlas!");

        return mongoClient;
    } catch (error) {
        console.error("Failed to connect database!", error);
        process.exit(1);
    }
}