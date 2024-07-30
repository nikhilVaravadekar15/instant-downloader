import Link from "next/link";
import SearchAndDownload from "@/components/ot/SearchAndDownload";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <SearchAndDownload />
    </main>
  );
}
