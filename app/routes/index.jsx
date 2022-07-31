import { Link, Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { db } from "utils/db.server";
import { getQuestions } from "utils/question.server";
import {
  createUserSession,
  getUserId,
  login,
  register,
} from "../../utils/session.server";
import { getUserById } from "../../utils/user.server";

import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Field from "../components/Field";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const searchQ = searchParams.get("q");

  const userId = await getUserId(request);

  const questions = await getQuestions(searchQ);

  if (userId) {
    const user = getUserById(userId);
    return { user, questions };
  }

  return { questions };
}

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");
  const action = formData.get("action");

  if (email && action && password) {
    if (action === "register") {
      const userExists = await db.user.findFirst({
        where: { email },
      });
      if (userExists) {
        return { error: `User with email ${email} already exists` };
      }

      const user = await register({ email, name, password });
      if (!user) {
        return { error: "something went wrong while creating user" };
      }
      return createUserSession(user.id, "/?logged");
    }

    if (action === "login") {
      const user = await login({ email, password });
      if (!user) {
        return { error: "Incorrect username or password" };
      }
      return createUserSession(user.id, "#");
    }
  }

  return { error: "all fields are required" };
}

export default function Index() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const loaderData = useLoaderData();

  return (
    <main className="flex flex-col items-stretch justify-start gap-8">
      <div className="flex flex-col items-stretch justify-start gap-8">
        <div className="flex flex-row items-stretch justify-end gap-2">
          {loaderData.user ? (
            <Button
              as={Link}
              to="/ask"
              onClick={() => setLogin(!login)}
              appearance="primary"
            >
              Ask a question
            </Button>
          ) : (
            <>
              <Button onClick={() => setLogin(!login)}>Login</Button>
              <Button
                onClick={() => setRegister(!register)}
                appearance="primary"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {!loaderData.user && (
          <>
            <Dialog isOpen={login} close={() => setLogin(false)} title="Login">
              <Form
                method="post"
                className="flex flex-col justify-between gap-2"
              >
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
                <Button
                  className="mt-3"
                  type="submit"
                  name="action"
                  value="login"
                >
                  Login
                </Button>
              </Form>
            </Dialog>

            <Dialog
              isOpen={register}
              close={() => setRegister(false)}
              title="Register"
            >
              <Form
                method="post"
                className="flex flex-col justify-between gap-2"
              >
                <Field
                  id="email"
                  name="email"
                  label="EMAIL"
                  type="text"
                  placeholder="Enter email"
                />
                <Field
                  id="name"
                  name="name"
                  label="NAME"
                  type="text"
                  placeholder="Enter name"
                />
                <Field
                  id="password"
                  name="password"
                  label="PASSWORD"
                  type="password"
                  placeholder="Enter password"
                />
                <Button
                  className="mt-3"
                  type="submit"
                  name="action"
                  value="register"
                >
                  Register
                </Button>
              </Form>
            </Dialog>
          </>
        )}

        <header className="flex flex-row items-start justify-start gap-6">
          <img
            src="/logo.svg"
            alt="logo Braintra"
            width={48}
            height={48}
            loading="lazy"
          />
          <div className="flex flex-col items-stretch justify-start">
            <p className="text-3xl font-black">Braintra</p>
            <p className="font-medium max-w-[40ch]">
              Ask questions, share knowledge, debate & discuss things that
              matter with the world.
            </p>
          </div>
        </header>
      </div>

      <Form className="flex items-end justify-between gap-2">
        <Field
          id="search"
          name="q"
          label="SEARCH"
          type="text"
          placeholder="Eg. Is it called gif or jif?"
        />
        <Button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Form>

      <section className="flex flex-col items-stretch justify-start gap-6">
        <h2 className="font-bold text-lg">Questions</h2>
        <div className="flex flex-col items-stretch justify-start gap-4">
          {loaderData.questions.map((question) => (
            <Link key={question.id} to={`/q/${question.slug}`}>
              <article className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-md transition duration-200 hover:shadow-2xl flex flex-col items-stretch justify-start gap-3">
                <div className="flex flex-col items-stretch justify-start gap-1">
                  <h3 className="font-bold text-xl">{question.question}</h3>
                  <p className="text-sm">
                    Asked on {new Date(question.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-row items-center justify-start gap-2">
                  <Button size="small">{question.likes.length} likes</Button>
                  <Button size="small">
                    {question.answers.length} answers
                  </Button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
