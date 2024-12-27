import prisma from "@/lib/prismadb";
import getUserSession from "./getUserSession";
import { Session } from "next-auth"; // Import Session type from next-auth

const getCurrentUser = async (): Promise<any | null> => {
  try {
    // Get the session typed as Session | null
    const session: Session | null = await getUserSession();

    // Ensure session and user exist
    if (!session?.user?.email) {
      return null;
    }

    // Query the current user from the database using the email from session
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return currentUser || null;
  } catch (error: any) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export default getCurrentUser;
