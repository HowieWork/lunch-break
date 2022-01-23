import { connectDatabase, insertDocument } from '../../lib/db-util';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // GET INPUT
    const { email, name, message } = req.body;

    // VALIDATE INPUT
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
      // CONNECT TO MONGODB DATABASE
      client = await connectDatabase('contacts');
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
      return;
    }

    // INSERT DOCUMENT TO COLLECTIONS
    try {
      const result = await insertDocument(client, 'messages', newMessage);
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
