import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addAnswer({ id, answer, request }) {
  const userID = await getUserId(request);

  const ans = await db.answer.create({
    data: {
      answer,
      questionID: id,
      userID,
    },
  });

  return ans;
}

export async function LikeAnswer({ id, request }) {
  const userID = await getUserId(request);

  const like = await db.answer_Likes.create({
    data: {
      answerID: id,
      userID,
    },
  });

  return like;
}

export async function unLikeAnswer({ id, request }) {
  const userID = await getUserId(request);

  const answer = await db.answer.findUnique({
    where: {
      id: id,
    },
    include: {
      likes: true,
    },
  });

  const LikeID = answer.likes.find((x) => x.userID === userID);

  const like = await db.answer_Likes.delete({
    where: {
      id: LikeID.id,
    },
  });

  return like;
}

export async function addComment({ id, comment, request }) {
  const userID = await getUserId(request);

  const ans = await db.answer_Comments.create({
    data: {
      comment,
      answerID: id,
      userID,
    },
  });

  return ans;
}
