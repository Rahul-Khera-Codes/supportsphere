const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Example of creating a new user
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });

  console.log('Created new user: ', newUser);

  // Example of fetching all users
  const allUsers = await prisma.user.findMany();
  console.log('All users: ', allUsers);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });