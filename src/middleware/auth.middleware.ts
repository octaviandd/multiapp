/** @format */

export const requireAuth = (
  req: { session: { userId: any } },
  res: { redirect: (arg0: string) => void },
  next: () => void
) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};
