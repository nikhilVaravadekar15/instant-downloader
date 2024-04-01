import React from "react";
import Link from "next/link";
import ytdl from "ytdl-core";

type TTabledata = {
  type: "video" | "audio";
  data: ytdl.videoFormat[];
};

export default function Table({ type, data }: TTabledata) {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg border">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100 dark:bg-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 dark:text-white">
              File type
            </th>
            <th scope="col" className="px-6 py-3 dark:text-white">
              File size
            </th>
            <th scope="col" className="px-6 py-3 dark:text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: ytdl.videoFormat, index: number) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 flex flex-col text-gray-700 dark:text-gray-200">
                  {type === "video" && (
                    <span className="w-fit p-1 rounded text-xs font-semibold text-white bg-[#337ab7]">
                      {row.qualityLabel}
                    </span>
                  )}
                  {type === "audio" && (
                    <span className="w-fit p-1 rounded text-xs font-semibold text-white bg-[#337ab7]">
                      {row.container}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 dark:text-gray-200">{row.quality}</td>
                <td className="px-6 py-4 text-left">
                  <Link
                    href={row?.url}
                    target="_blank"
                    className="font-semibold text-sm py-2 px-6 rounded text-white bg-blue-500 hover:bg-blue-600"
                  >
                    Download
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
