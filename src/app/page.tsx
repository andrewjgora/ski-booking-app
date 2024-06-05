import Link from "next/link";

export default function Page() {

  return (
    <main className="h-full flex flex-col items-center justify-center gap-10">
      <h1>Landing Page</h1>
      <Link className="btn btn-primary" href="/dashboard">Go to Dashboard</Link>
    </main>
  );
}