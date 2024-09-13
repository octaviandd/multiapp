/** @format */

// /** @format */
// import { NextFunction, Request, Response, Router } from "express";

// const router = Router();

// /**
//  * Get profile
//  * @auth optional
//  * @route {GET} /profiles/:username
//  * @param username string
//  * @returns profile
//  */
// router.get(
//   '/profiles/:username',
// //   auth.optional,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const profile = await getProfile(req.params?.username, req.user?.username as string);
//       res.json({ profile });
//     } catch (error) {
//       next(error);
//     }
//   },
// );

// Router.get("/profile", async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   });
//   res.json(posts);
// });

// app.post("/post", async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const post = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(post);
// });

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.update({
//     where: { id },
//     data: { published: true },
//   });
//   res.json(post);
// });

// app.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.delete({
//     where: {
//       id,
//     },
//   });
//   res.json(user);
// });
