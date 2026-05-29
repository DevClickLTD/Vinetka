"use client";

import dynamic from "next/dynamic";

const NextTopLoader = dynamic(() => import("nextjs-toploader"), { ssr: false });

export default function DeferredTopLoader() {
  return <NextTopLoader showSpinner={false} color="#803487" />;
}
