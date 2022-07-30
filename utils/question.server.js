import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function askQuestion({ data, request }) {
  const userID = await getUserId(request);
  data.userID = userID;
  const question = await db.question.create({
    data: data,
  });

  return question;
}

export async function getQuestions() {
  const questions = await db.question.findMany({
    include: {
      likes: true,
      answers: true,
    },
  });
  return questions;
}

export async function getQuestionBySlug({ slug }) {
  const question = await db.question.findUnique({
    where: {
      slug,
    },
    include: {
      likes: true,
      answers: {
        include: {
          likes: true,
          comments: true,
        },
      },
    },
  });
  return question;
}

export async function LikeQuestion({ id, request }) {
  const userID = await getUserId(request);

  const post = await db.question_Likes.create({
    data: {
      questionID: id,
      userID,
    },
  });

  return post;
}

export async function unLikeQuestion({ id, request }) {
  const userID = await getUserId(request);

  const question = await db.question.findUnique({
    where: {
      id: id,
    },
    include: {
      likes: true,
    },
  });

  const LikeID = question.likes.find((x) => x.userID === userID);

  const like = await db.question_Likes.delete({
    where: {
      id: LikeID.id,
    },
  });

  return like;
}
