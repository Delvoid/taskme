import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <span>gotta fix me</span>
      <Link href={"/projects"}>projects</Link>
    </div>
  );
}
