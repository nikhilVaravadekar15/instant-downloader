import React from "react";
import { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { TStep } from "@/types/types";

export const metadata: Metadata = {
  title: "Instant-downloader | FAQ",
};

export default function FaqPage() {
  return (
    <main className="w-full py-16 gap-3 mx-auto flex flex-col items-center justify-center text-center sm:w-[640px] lg:w-[768px]">
      <div className="mt-6">
        <span className="mx-4 text-blue-600">FAQs</span>
        <h1 className="text-2xl text-clip font-black sm:text-3xl lg:text-5xl xl:text-6xl">
          Frequently asked questions
        </h1>
      </div>
      <div className="cards w-10/12 sm:w-full my-6">
        {faqs.map((faq: TStep, index: number) => {
          return (
            <div className="card p-4" key={index}>
              <details className="transition duration-500 bg-gray-100 cursor-pointer p-8 border-solid border-l-8 border-blue-600 rounded-md hover:bg-gray-50 dark:bg-slate-800 hover:dark:bg-gray-700">
                <summary className="flex items-center justify-between focus:outline-none">
                  <header className="w-full flex items-center gap-2">
                    <h1 className="leading-5 flex gap-1 text-left text-lg font-semibold sm:text-xl">
                      <span className="w-4 text-black bg-white font-bold">
                        {index + 1}.
                      </span>
                      {faq.title}
                    </h1>
                  </header>
                </summary>
                <div className="content ml-14 text-lg text-left">
                  <p>{faq.description}</p>
                </div>
              </details>
            </div>
          );
        })}
      </div>
    </main>
  );
}
