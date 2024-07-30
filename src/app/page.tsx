import { TStep } from "@/types/types";
import { keyFeatures } from "@/data/index";
import SearchAndDownload from "@/components/ot/SearchAndDownload";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <SearchAndDownload />
      <KeyFeaturesComponents />
    </main>
  );
}

function KeyFeaturesComponents() {
  return (
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
  );
}
