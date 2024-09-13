/** @format */

// /** @format */

// import prisma from "../../prisma/prisma-client";

// const getUser = async (username: string, currentUsername: string) => {
//   const user = await prisma.user.findUnique({
//     where: { username },
//     include: { profile: true },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const following = await prisma.user.findFirst({
//     where: {
//       username: currentUsername,
//       following: { some: { username } },
//     },
//   });

//   return { ...user, following: !!following };
// };
