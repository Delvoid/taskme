import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <div>
      <h1>Home page</h1>
      <span>gotta fix me</span>
      <Link href={"/projects"}>projects</Link>
      {session && (
        <>
          <div>{JSON.stringify(session)}</div>
          <button onClick={() => signOut()}>signout</button>
        </>
      )}
    </div>
  );
}
