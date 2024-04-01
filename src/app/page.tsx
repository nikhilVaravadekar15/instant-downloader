import { TStep } from "@/types/types";
import { keyFeatures, usageSteps } from "@/data/index";
import SearchAndDownload from "@/components/ot/SearchAndDownload";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <SearchAndDownload />
      <div className="py-24 gap-3 mx-auto flex flex-col items-center justify-center text-center sm:w-[412px] md:w-[640px] lg:w-[768px]">
        <h1 className="text-4xl font-black mt-6">
          How to Use
          <span className="mx-4 text-blue-600">?</span>
        </h1>
        <div className="sm:w-full">
          {usageSteps.map((step: TStep, index: number) => {
            return (
              <div className="card p-4" key={index}>
                <details className="transition duration-500 bg-gray-100 cursor-pointer p-8 border-solid border-l-8 border-blue-600 rounded-md hover:bg-gray-600/10 dark:bg-slate-800 hover:dark:bg-gray-700 hover:dark:shadow-white">
                  <summary className="flex items-center justify-space-between focus:outline-none">
                    <header className="flex justify-center items-center gap-2">
                      <div className="h-[48px] w-[48px] border rounded-full flex items-center justify-center text-black bg-white font-bold">
                        {index + 1}
                      </div>
                      <h1 className="leading-5 flex self-center text-xl font-semibold">
                        {step.title}
                      </h1>
                    </header>
                  </summary>
                  <div className="content ml-14 text-lg text-left">
                    <p>{step.description}</p>
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full py-24 gap-3 mx-auto flex flex-col items-center justify-center text-center sm:w-[412px] md:w-[640px] lg:w-[768px]">
        <h1 className="text-4xl font-black mt-6">
          Key
          <span className="mx-4 text-blue-600">features</span>
        </h1>
        <div className="cards w-10/12 flex items-center justify-center flex-wrap sm:w-full">
          {keyFeatures.map((step: TStep, index: number) => {
            return (
              <div className="card p-4 w-10/12 sm:w-96" key={index}>
                <div className="cursor-pointer p-8 flex gap-4 flex-col border-solid rounded-lg border bg-gray-100 hover:bg-gray-50 shadow-md hover:shadow-xl dark:bg-slate-800 hover:dark:bg-slate-700">
                  <div className="flex justify-center items-center flex-col gap-2 sm:items-start">
                    <div className="h-[48px] w-[48px] border rounded-full flex items-center justify-center text-lg bg-white">
                      {step.icon}
                    </div>
                    <h1 className="leading-5 text-lg font-semibold">
                      {step.title}
                    </h1>
                  </div>
                  <div className="content text-lg text-center sm:text-left">
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
