import { connectDatabase, insertDocument } from '../../lib/db-util';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // GET INPUT
    const { email } = req.body;
    // VALIDATE INPUT
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    // CONNNECTING MONGODB DATABASE
    let client;
    try {
      client = await connectDatabase('subscription');
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
    }

    // INSERT DOCUMENT TO COLLECTIONS
    try {
      await insertDocument(client, 'emails', { email: email });
    } catch (error) {
      res.status(500).json({ message: 'Storing data failed!' });
    }

    // CLOSE DATABASE CONNECTION
    client.close();

    res.status(201).json({ message: 'Successfully subscribed!' });
  }
};

export default handler;
