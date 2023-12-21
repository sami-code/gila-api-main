import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      phone: '65653653',
      subscribed: ['FINANCE', 'MOVIES'],
      types: ['EMAIL', 'SMS']
    }
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      phone: '548214',
      subscribed: ['FINANCE', 'SPORTS'],
      types: ['NOTIFICATION', 'SMS']
    },
  })
  const nick = await prisma.user.upsert({
    where: { email: 'nick@prisma.io' },
    update: {},
    create: {
      email: 'nick@prisma.io',
      name: 'Nick',
      phone: '6835545',
      subscribed: ['SPORTS'],
      types: ['NOTIFICATION']
    },
  })
  const john = await prisma.user.upsert({
    where: { email: 'john@prisma.io' },
    update: {},
    create: {
      email: 'john@prisma.io',
      name: 'John',
      phone: '64343545',
      subscribed: ['FINANCE', 'SPORTS', 'MOVIES'],
      types: ['NOTIFICATION', 'SMS', 'EMAIL']
    },
  })
  const beth = await prisma.user.upsert({
    where: { email: 'beth@prisma.io' },
    update: {},
    create: {
      email: 'beth@prisma.io',
      name: 'Beth',
      phone: '4554455452',
      subscribed: ['SPORTS', 'MOVIES'],
      types: ['SMS']
    },
  })
  console.log({ alice, bob, nick, john, beth })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
