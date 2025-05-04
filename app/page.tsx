"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (session.status === "authenticated") {
    return (
      <>
        <h1>Welcome {session.data?.user?.name}</h1>
      </>
    );
  }
  return "";
}
