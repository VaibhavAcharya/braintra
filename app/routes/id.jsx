import { Link } from "@remix-run/react";

import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Field from "../components/Field";

export default function Post() {
  return (
    <main className="flex flex-col items-stretch justify-start gap-8">
      <div className="flex flex-col items-stretch justify-start gap-8">
        <header className="flex flex-row items-start justify-start gap-6">
          <Button as={Link} to="/" className="min-h-[32px] flex flex-row items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
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
          <h1 className="text-xl font-bold">Fucking question goes here?</h1>
        </div>  
      </div>

      <form className="flex items-end justify-between gap-2">
        <Field id="search" name="q" label="SEARCH" type="text" placeholder="Eg. Is it called gif or jif?" />
        <Button type="submit">
          Search
        </Button>
      </form>
    </main>
  );
}
