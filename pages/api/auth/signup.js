import { connectDatabase, insertDocument } from '../../../lib/db-util';
import { hashPassword } from '../../../lib/auth-util';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }

  // 1. GET REQUEST DATA
  const { email, password } = req.body;

  // 2. VALIDATE DATA
  // CHECK IF DATA IS VALID
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message: 'Invalid data. Password should be at least 6 characters.',
    });
    client.close();
    return;
  }

  // 3. STORE DATA TO DATABASE
  // 1) CONNECT TO DATABASE
  let client;
  try {
    client = await connectDatabase('users');
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    client.close();
    return;
  }

  // 2) CHECK IF USER EXISTS
  const db = client.db();
  const existingUser = await db.collection('users').findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  // 3) STORE DOCUMENT TO COLLECTIONS
  // HASH PASSWORD AND ORGANIZE NEW USER DATA
  const hashedPassword = await hashPassword(password);
  const newUser = {
    email: email,
    password: hashedPassword,
  };

  try {
    const result = await insertDocument(client, 'users', newUser);
    // OPTIONAL
    newUser.id = result.insertedId;

    res.status(201).json({ message: 'You have signed up successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Storing user data failed!' });
  }

  // 4. CLOSE DATABASE CONNECTION
  client.close();
};

export default handler;
