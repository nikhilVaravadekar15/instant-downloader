import React from "react";
import Link from "next/link";
import Origin from "@/components/ot/Origin";

export default function Footer() {
  return (
    <div className="overflow-x-hidden">
      <div className="wh-[24vh] w-[100%] rounded-tl-[8%] rounded-tr-[32%] bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
        <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col items-center justify-center pt-5 pb-10 sm:gap-4 md:flex-row md:justify-between">
            <div className="flex flex-col gap-2 text-gray-100 sm:items-center sm:justify-center md:items-start">
              <span className="text-sm flex gap-0.5 sm:text-center">
                <span>Copyright © 2023</span>
                <>
                  <Origin />™
                </>
              </span>
              <span>All Rights Reserved.</span>
            </div>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <Link
                href="/faq"
                hrefLang="en"
                className="font-semibold sm:text-base text-blue-100 hover:text-orange-300 hover:underline"
              >
                FAQ
              </Link>
              <Link
                href={"/terms-and-conditions"}
                hrefLang="en"
                className="font-semibold sm:text-base text-blue-100 hover:text-orange-300 hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
