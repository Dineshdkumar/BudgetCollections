import prisma from "@/lib/prismadb";

export const getOrders = async (user: any) => {
  if (!user || !user.id) {
    return []; // Return empty array if user is invalid
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
  });

  return orders;
};
