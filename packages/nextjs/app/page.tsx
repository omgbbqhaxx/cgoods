"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, FingerPrintIcon, LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: ccountt } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "ccount",
  });

  const { data: clist } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "plister",
  });

  const candidateCount = ccountt ? Number(ccountt) : 0;

  console.log("acccccounttt here bro ", ccountt);

  console.log("clist here bro ", clist);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Ch-GOODS</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col items-center max-w-4xl w-full">
              <h2 className="text-2xl font-bold mb-4">🏆 Prize Distribution</h2>
              <ul className="mb-4">
                <li>
                  <b>Winner:</b> $1000 (in ETH)
                </li>
                <li>
                  <b>Finalist:</b> $500 (in ETH)
                </li>
              </ul>
              {clist && clist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {clist.map((candidate, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <span className={`badge ${index < 2 ? "bg-success" : "bg-warning"} text-black mb-2`}>
                        {index < 2 ? "Winner" : "Finalist"}
                      </span>
                      <h3 className="font-semibold text-black text-black-800">{candidate._title}</h3>
                      <p className="text-sm text-black text-black-600 mt-2">{candidate._explanation}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex">
                          {candidate._ghub && (
                            <a href={candidate._ghub} target="_blank" rel="noopener noreferrer" className="mr-2">
                              <LinkIcon className="h-3 w-3 fill-black" />
                            </a>
                          )}
                          {candidate._ytube && (
                            <a href={candidate._ytube} target="_blank" rel="noopener noreferrer" className="ml-2">
                              <LinkIcon className="h-3 w-3 fill-black" />
                            </a>
                          )}
                        </div>
                        <div className="text-xs text-black text-500">Votes: {candidate._vote.toString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-purple-600">No candidates available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
