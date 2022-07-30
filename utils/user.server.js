import { db } from "./db.server";

export async function getUserById(id) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  delete user.passwordHash;

  return user;
}
