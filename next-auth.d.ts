import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
    } & DefaultSession['user']
  }

  interface User {
    name: string;
    email: string
  }
}