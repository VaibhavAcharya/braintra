import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesRef from "~/styles/tailwind.css";
import Anchor from "./components/Anchor";

export const meta = () => {
  return {
    charset: "utf-8",

    title: "Braintra — Discuss with the world.",

    viewport: "width=device-width,initial-scale=1",
  };
};

export const links = () => {
  return [
    {
      rel: "icon",
      type: "image/svg",
      href: "/logo.svg",
    },

    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap",
    },

    {
      rel: "stylesheet",
      href: tailwindStylesRef,
    },
  ];
};

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900 text-white/95">
        <svg
          className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="pedroduarteisalegend">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            ></feTurbulence>
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#pedroduarteisalegend)"
          ></rect>
        </svg>
        <div
          className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
          h-full
          bg-[url(https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)]
          bg-no-repeat
          bg-top
          opacity-25
          blur-3xl
        "
        ></div>

        <div className="px-8 py-8 md:py-24 mx-auto w-[min(720px,_100%)] min-h-screen">
          <Outlet />

          <footer className="text-sm pt-24 text-center text-neutral-200/80 flex flex-col items-center justify-start gap-2">
            <p>
              This project was build for the [
              <Anchor
                href="https://planetscale.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                PlanetScale
              </Anchor>{" "}
              x{" "}
              <Anchor
                href="https://hashnode.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hashnode
              </Anchor>
              ] hackathon in July 2022.
            </p>
            <p>
              Launch blog published on{" "}
              <Anchor
                href="https://namanvyas.hashnode.dev/introducing-braintra-a-beautiful-qna-platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hashnode
              </Anchor>
              .
            </p>
            <p>
              Build by{" "}
              <Anchor
                href="https://vaibhavacharya.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vaibhav Acharya
              </Anchor>{" "}
              and{" "}
              <Anchor
                href="https://namanvyas.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Naman Vyas
              </Anchor>
              .
            </p>
          </footer>
        </div>

        <ScrollRestoration />
        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}
