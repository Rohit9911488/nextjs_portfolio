"use client";

import dynamic from "next/dynamic";

const GlobeNetwork = dynamic(() => import("./index"), { ssr: false });

export default function GlobeNetworkDeferred() {
  return <GlobeNetwork />;
}
