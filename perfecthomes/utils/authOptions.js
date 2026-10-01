import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        if (!profile?.email) {
          console.error('[NextAuth] signIn: missing email in Google profile');
          return false;
        }

        await connectDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          const username = (profile.name || profile.email.split('@')[0]).slice(0, 20);

          await User.create({
            email: profile.email,
            username,
            image: profile.picture || '',
          });
        }

        return true;
      } catch (error) {
        // Duplicate key on race condition — user already exists, still allow sign in
        if (error.code === 11000) {
          console.warn('[NextAuth] signIn: duplicate user on create (race condition), allowing sign in');
          return true;
        }
        console.error('[NextAuth] signIn callback error:', error);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDB();

        const user = await User.findOne({ email: session.user.email });

        if (user) {
          session.user.id = user._id.toString();
        }

        return session;
      } catch (error) {
        console.error('[NextAuth] session callback error:', error);
        return session;
      }
    },
  },
};
