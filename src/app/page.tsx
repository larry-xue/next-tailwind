'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const handleRandomRoute = () => {
    router.push(`/test1/${Math.random()}`)
  }

  return (
    <div className="bg-red-300 p-3 text-slate-100">
      <div>
        <h1 className="text-3xl text-blue-400">currently in learning nextjs13</h1>
        <ul className="bg-cyan-200 p-2 text-black underline">
          <li>
            <Link href="/test1">test1</Link>
          </li>
          <li>
            <button onClick={handleRandomRoute}>
              test1/{"{"}random{"}"}
            </button>
          </li>
          <li>
            <Link href="/test2">test2</Link>
          </li>{" "}
          <li>
            <Link href="/about">about</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
