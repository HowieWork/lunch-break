import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../../lib/auth-util';
import { connectDatabase } from '../../../../lib/db-util';

// NOTE RESET PASSWORD ROUTE: /api/user/password/reset

const handler = async (req, res) => {
  // 1. CHECK REQUEST METHOD
  if (req.method !== 'PATCH') {
    return;
  }

  // 2. IMPORTANT CHECK IF SESSION EXISTS
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  // 3. EXTRACT DATA FROM SESSION AND REQUEST BODY
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // 4. GET DOCUMENT (*USER) FROM DATABASE
  const client = await connectDatabase('users');
  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  // 5. CHECK IF USER IS AUTHORIZED BY COMPARING PASSWORDS
  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    client.close();
    return;
  }

  // 6. HASH NEW PASSWORD
  const hashedPassword = await hashPassword(newPassword);

  try {
    // 7. UPDATE NEW PASSWORD
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
  } catch (error) {
    // 10. Handling error
    client.close();
    throw new Error(error.message);
  }

  // 8. CLOSE DATABASE CONNECTION
  client.close();

  // 9. SENDING SUCCESS UPDATED RESPONSE
  res.status(200).json({ message: 'Password updated!' });
};

export default handler;
