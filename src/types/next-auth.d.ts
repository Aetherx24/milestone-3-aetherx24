import 'next-auth';
import { DefaultSession } from 'next-auth';

// access token data through session.user on the client side 
const { data: session } = useSession(); 

// access token data through session user on the server side 
const session = await getServerSession(authOptions);

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string | null;
    role: string;
  }
} 