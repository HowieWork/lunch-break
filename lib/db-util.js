import { MongoClient } from 'mongodb';

export const connectDatabase = async (database) => {
  const client = await MongoClient.connect(
    `mongodb+srv://howie:***REMOVED***@cluster0.nornx.mongodb.net/${database}?retryWrites=true&w=majority`
  );

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
