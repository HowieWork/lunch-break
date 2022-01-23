import { MongoClient } from 'mongodb';

export const connectDatabase = async (database) => {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.nornx.mongodb.net/${database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
};

export const insertDocument = async (client, collection, document) => {
  // CONNECT TO DATABASE
  const db = client.db();
  // INSERT DOCUMENT
  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (client, collection, sort, filter) => {
  // GET DATABASE
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};
