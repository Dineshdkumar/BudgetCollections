// app/(auth)/getUserSession.ts

import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth"; // You can define any additional types for session options if needed

// You can define session options inline or use the default ones
export default async function getUserSession() {
  return await getServerSession();
}
