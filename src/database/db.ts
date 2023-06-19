import { PrismaClient } from '@prisma/client';
//import { DateTime } from 'luxon';

const prisma = new PrismaClient()

//const dateOfBirth = DateTime.fromFormat('06022001', 'ddMMyyyy').toJSDate();

async function main(){
  const user = await prisma.users.findMany();
  console.log(user);
}

main()
  .then(async ()=> {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })