import prisma from "@/lib/prismadb";

export const getOrders = async (user: any) => {
  if (!user || !user.id) {
    throw new Error("User is not valid or user id is missing");
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
  });

  return orders;
};
