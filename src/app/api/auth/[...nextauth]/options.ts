import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@/lib/db'
import { User } from '@/models/user.model'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });
        
        if (existingUser) return true;

        await User.create({
          name: user.name,
          email: user.email
        })
        
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    
    async session({ session, token }: any) {
      if (session?.user) {
        const user = await User.findOne({ email: session.user.email });
        session.user._id = user?._id.toString();
        session.user.name = user?.name;
        session.user.email = user?.email;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
}