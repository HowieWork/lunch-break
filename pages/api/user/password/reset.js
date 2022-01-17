// RESET PASSWORD ROUTE: /api/user/password/reset
import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../../lib/auth-util';
import { connectDatabase } from '../../../../lib/db-util';

const handler = async (req, res) => {
  // 1. CHECK REQUEST METHOD
  if (req.method !== 'PATCH') {
    return;
  }

  // 2. CHECK IF AUTHENTICATED
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabase('users');
  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  // CHECK IF PASSWORD MATCHING/AUTHORIZED
  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    client.close();
    return;
  }

  // HASH NEW PASSWORD
  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  // TODO ADD ERROR HANDLING

  client.close();

  res.status(200).json({ message: 'Password updated!' });
};

export default handler;
