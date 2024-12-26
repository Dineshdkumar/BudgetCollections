// getUserSession.tsx

import { getServerSession } from "next-auth";
import { GET } from "../api/auth/[...nextauth]/route"; // Import GET directly

export default async function getUserSession() {
  return await getServerSession(GET); // Use the GET handler directly
}
