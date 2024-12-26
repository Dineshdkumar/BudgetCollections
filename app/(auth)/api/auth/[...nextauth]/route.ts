import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import { SessionStrategy } from "next-auth"; // Import the correct type

// Define authOptions
const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly set type to SessionStrategy
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Define the Next.js API route handler for GET and POST requests
const handler = NextAuth(authOptions);

// Export the handler as GET and POST methods
export { handler as GET, handler as POST };
