import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Field from "../components/Field";

export default function Index() {
  return (
    <main className="flex flex-col items-stretch justify-start gap-16">
      <div className="flex flex-col items-stretch justify-start gap-8">
        <div className="flex flex-row items-stretch justify-end gap-2">
          <Button>Login</Button>
          <Button primary>Create a post</Button>
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
              Ask questions, share <Anchor href="/">knowledge</Anchor>, debate & discuss <Anchor href="/" styled={false}>things</Anchor> that
              matter with the world.
            </p>
          </div>
        </header>
      </div>

      <Field id="search" label="SEARCH" type="text" placeholder="Eg. Is it called gif or jif?" required={false} error="This field is sexy af!" />

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
          </article>
        </div>
      </section>
    </main>
  );
}
