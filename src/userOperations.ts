import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserOperations {
  static async getUsersBySubscription(category: Category){
    const users = await prisma.user.findMany({
      where: {
        subscribed: {
          hasEvery: category
        }
      }
    });
    return users;
  }
}

export { UserOperations };
