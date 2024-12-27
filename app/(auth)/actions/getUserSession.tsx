// In getUserSession.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Correctly import authOptions

export default async function getUserSession() {
  return await getServerSession(authOptions); // Use authOptions here
}
