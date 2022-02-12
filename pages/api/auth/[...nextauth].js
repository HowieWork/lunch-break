import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectDatabase } from '../../../lib/db-util';
import { verifyPassword } from '../../../lib/auth-util';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // 1. CONNECT TO DATABASE
        const client = await connectDatabase('users');
        const usersCollection = client.db().collection('users');

        // 2. CHECK IF USER EXISTS
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        // 3. VERIFY PASSWORD
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Wrong password, could not log in!');
        }

        client.close();

        return { email: user.email, name: user.name };
      },
    }),
  ],
});
