import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { findUserByEmail, logUsers } from "@/lib/users"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key-here",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('=== Authorization Attempt ===');
        console.log('Attempting to authorize:', credentials?.email);
        logUsers();
        
        const user = findUserByEmail(credentials?.email || '');
        
        if (user) {
          console.log('Password check:', {
            provided: credentials?.password,
            stored: user.password,
            match: user.password === credentials?.password
          });
        }
        
        if (user && user.password === credentials?.password) {
          console.log('Authorization successful for:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        }
        
        console.log('Authorization failed');
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('=== JWT Callback ===');
      console.log('Token:', token);
      console.log('User:', user);
      console.log('Account:', account);
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('=== Session Callback ===');
      console.log('Session:', session);
      console.log('Token:', token);
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('=== Redirect Callback ===');
      console.log('URL:', url);
      console.log('Base URL:', baseUrl);
      
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    }
  },
  debug: true,
})

export { handler as GET, handler as POST } 