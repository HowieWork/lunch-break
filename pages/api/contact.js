import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    // STORE IT IN MONGODB DATABASE
    const newMessage = { email, name, message };

    let client;

    try {
      // CONNECT TO MONGODB
      client = await MongoClient.connect(
        `mongodb+srv://howie:***REMOVED***@cluster0.nornx.mongodb.net/my-site?retryWrites=true&w=majority`
      );
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
      return;
    }

    // CONNECT TO DATABASE
    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      // ADD THE SAME INSERTED ID TO NEWMESSAGE
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    // CLOSE DATABASE CONNECTION
    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', data: newMessage });
  }
};

export default handler;
