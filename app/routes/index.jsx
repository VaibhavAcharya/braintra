import { Link } from "@remix-run/react";

import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Field from "../components/Field";

export default function Index() {
  return (
    <main className="flex flex-col items-stretch justify-start gap-8">
      <div className="flex flex-col items-stretch justify-start gap-8">
        <div className="flex flex-row items-stretch justify-end gap-2">
          <Button as={Link} to="/post" appearance="primary">Create a post</Button>
        </div>
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
      <Dialog >Hey</Dialog>

      <form className="flex items-end justify-between gap-2">
        <Field id="search" name="q" label="SEARCH" type="text" placeholder="Eg. Is it called gif or jif?" />
        <Button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </Button>
      </form>

      <section className="flex flex-col items-stretch justify-start gap-6">
        <h2 className="font-bold text-lg">Trending today</h2>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <article className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-md transition duration-200 hover:shadow-2xl flex flex-col items-stretch justify-start gap-3">
            <div className="flex flex-col items-stretch justify-start gap-1">
              <h3 className="font-bold text-xl">Why are rainbows semi-circle?</h3>
              <p className="text-sm">Asked today by <Anchor href="/">Naman Vyas</Anchor></p>
            </div>

            <div className="flex flex-row items-center justify-start gap-2">
              <Button size="small">16 likes</Button>
              <Button size="small">3 comments</Button>
            </div>

            <article className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-md transition duration-200 hover:shadow-2xl flex flex-col items-stretch justify-start gap-3">
            <div className="flex flex-col items-stretch justify-start gap-1">
              <h3 className="font-bold text-xl">Why are rainbows semi-circle?</h3>
              <p className="text-sm">Asked today by <Anchor href="/">Naman Vyas</Anchor></p>
            </div>

            <div className="flex flex-row items-center justify-start gap-2">
              <Button appearance="liked" size="small">16 likes</Button>
              <Button size="small">3 comments</Button>
              <Field id="search" name="q" label="SEARCH" type="text" placeholder="Eg. Is it called gif or jif?" />

            </div>
          </article>
          </article>
        </div>
      </section>
    </main>
  );
}
