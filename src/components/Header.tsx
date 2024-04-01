import Link from "next/link";
import Image from "next/image";
import ShareModal from "@/components/ot/ShareModal";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center py-3 sm:flex-row sm:justify-between xl:container xl:mx-auto border-b">
      <div className="shrink w-80 flex items-center justify-center">
        <Link href={"/"} className="group flex items-center justify-center">
          <Image
            src={"/favicon.png"}
            alt="logo"
            width={48}
            height={48}
            draggable={false}
          />
        </Link>
      </div>
      <div className="flex gap-3 items-center justify-center sm:w-96">
        <ShareModal />
        <ThemeToggle />
      </div>
    </div>
  );
}
