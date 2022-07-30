import { Link, useLoaderData, Form } from "@remix-run/react";
import {
  getQuestionBySlug,
  LikeQuestion,
  unLikeQuestion,
} from "utils/question.server";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import {
  addAnswer,
  addComment,
  LikeAnswer,
  unLikeAnswer,
} from "utils/answer.server";

import Button from "../../components/Button";
import Field from "../../components/Field";
import Dialog from "~/components/Dialog";
import { useState } from "react";

export async function loader({ params, request }) {
  const slug = params.slug;
  const question = await getQuestionBySlug({ slug });

  let user = null;
  const userID = await getUserId(request);
  if (userID) {
    user = await getUserById(userID);
  }

  return { question, user };
}

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("postID");
  const answer = formData.get("answer");
  const action = formData.get("action");
  const comment = formData.get("comment");
  // const followUserID = formData.get("userID");

  if (action) {
    if (action === "Like") {
      const like = await LikeQuestion({ id, request });
      if (!like) {
        return { error: "something went wrong liking post" };
      }
      return { data: "success" };
    }

    if (action === "unLike") {
      const like = await unLikeQuestion({ id, request });
      if (!like) {
        return { error: "something went wrong unLiking post" };
      }
      return { data: "success" };
    }

    if (action === "answer") {
      const followUSer = await addAnswer({ id, answer, request });
      if (!followUSer) {
        return { error: "something went wrong following user" };
      }
      return { data: "success" };
    }

    if (action === "answerLike") {
      const like = await LikeAnswer({ id, request });
      if (!like) {
        return { error: "something went wrong liking post" };
      }
      return { data: "success" };
    }

    if (action === "answerUnLike") {
      const like = await unLikeAnswer({ id, request });
      if (!like) {
        return { error: "something went wrong unLiking post" };
      }
      return { data: "success" };
    }

    if (action === "comment") {
      const com = await addComment({ id, comment, request });
      if (!com) {
        return { error: "something went wrong liking post" };
      }
      return { data: "success" };
    }
  }

  return { error: "Action not found" };
}

export default function Post() {
  const loaderData = useLoaderData();
  const question = loaderData.question;
  const user = loaderData.user;

  const [login, setLogin] = useState(false);

  function isLiked(id) {
    const obj = question.likes.find((x) => x.userID === id);
    if (obj) {
      return true;
    }
    return false;
  }

  return (
    <main className="flex flex-col items-stretch justify-start gap-8">
      {!user && (
        <Dialog isOpen={login} close={() => setLogin(false)} title="Login">
          <Form method="post" className="flex flex-col justify-between gap-2">
            <Field
              id="email"
              name="email"
              label="EMAIL"
              type="text"
              placeholder="Enter email"
            />
            <Field
              id="password"
              name="password"
              label="PASSWORD"
              type="password"
              placeholder="Enter password"
            />
            <Button className="mt-3" type="submit" name="action" value="login">
              Login
            </Button>
          </Form>
        </Dialog>
      )}

      <div className="flex flex-col items-stretch justify-start gap-8">
        <header className="flex flex-row items-start justify-start gap-6">
          <Button
            as={Link}
            to="/"
            className="min-h-[32px] flex flex-row items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <img
            src="/logo.svg"
            alt="logo Braintra"
            width={32}
            height={32}
            loading="lazy"
          />
        </header>
        <div className="flex flex-row items-stretch justify-start gap-2">
          <h1 className="text-xl font-bold">{question.question}</h1>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {user ? (
            <Form method="post">
              <input defaultValue={question.id} name="postID" hidden />
              <Button
                type="submit"
                name="action"
                appearance={isLiked(user.id) ? "liked" : "secondary"}
                value={isLiked(user.id) ? "unLike" : "Like"}
                size="small"
              >
                {question.likes.length} likes
              </Button>
            </Form>
          ) : (
            <Button onClick={() => setLogin(true)} size="small">
              {question.likes.length} likes
            </Button>
          )}

          <Button size="small">{question.answers.length} answers</Button>
        </div>
      </div>
      <Form
        onSubmit={(e) => {
          if (!user) e.preventDefault();
          setLogin(true);
        }}
        method="post"
        className="flex items-end justify-between gap-2"
      >
        <input defaultValue={question.id} name="postID" hidden />
        <Field
          id="answer"
          name="answer"
          label="ANSWER"
          type="text"
          placeholder="Eg. its gif"
        />
        <Button type="submit" name="action" value="answer">
          Answer
        </Button>
      </Form>

      {question.answers.map((answer) => {
        function isLiked(id) {
          const obj = answer.likes.find((x) => x.userID === id);
          if (obj) {
            return true;
          }
          return false;
        }

        return (
          <article
            key={answer.id}
            className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-md transition duration-200 hover:shadow-2xl flex flex-col items-stretch justify-start gap-3"
          >
            <div className="flex flex-col items-stretch justify-start gap-1">
              <h3 className="font-bold text-xl">{answer.answer}</h3>
              <p className="text-sm">Answered today</p>
            </div>

            <div className="flex flex-row items-center justify-start gap-2">
              {user ? (
                <Form method="post">
                  <input defaultValue={answer.id} name="postID" hidden />
                  <Button
                    type="submit"
                    name="action"
                    appearance={isLiked(user.id) ? "liked" : "secondary"}
                    value={isLiked(user.id) ? "answerUnLike" : "answerLike"}
                    size="small"
                  >
                    {answer.likes.length} likes
                  </Button>
                </Form>
              ) : (
                <Button onClick={() => setLogin(true)} size="small">
                  {answer.likes.length} likes
                </Button>
              )}
              <Button size="small">{answer.comments.length} Comments</Button>
            </div>
            <Form
              onSubmit={(e) => {
                if (!user) e.preventDefault();
                setLogin(true);
              }}
              method="post"
              className="flex items-end justify-between gap-2"
            >
              <input defaultValue={answer.id} name="postID" hidden />
              <Field
                id="comment"
                name="comment"
                label="COMMENT"
                type="text"
                placeholder="Eg. Right!"
              />
              <Button type="submit" name="action" value="comment">
                Comment
              </Button>
            </Form>
            {answer.comments.map((comment) => (
              <article
                key={comment.id}
                className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-md transition duration-200 hover:shadow-2xl flex flex-col items-stretch justify-start gap-3"
              >
                <div className="flex flex-col items-stretch justify-start gap-1">
                  <h3 className="font-bold text-xl">{comment.comment}</h3>
                </div>
              </article>
            ))}
          </article>
        );
      })}
    </main>
  );
}
