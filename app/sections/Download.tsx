"use client";
import React from "react";
import { FC } from "react";
import { logos } from "../../constants/index";
import Image from "next/image";

interface Logo {
  id: string;
  url: string;
  width: number;
  height: number;
  title: string;
}

const Download: FC = () => {
  return (
    <section>
      <div
        id="download"
        className="relative pb-32 pt-24 max-lg:pb-24 max-md:py-16 bg-white dark:bg-[#030822]"
      >
        <div className="container">
          <div className="flex items-center">
            <div className="relative mr-6 flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
              <div className="mb-10">
                <Image
                  src="/images/magic.svg"
                  width={160}
                  height={55}
                  alt="xora"
                />
              </div>

              <p className="body-1 mb-10 max-w-md text-black dark:text-white">
                Try it now for free Web
              </p>

              <div className="p-3 border rounded-xl bg-gray-950 border-blue-600">
                <img
                  src="/images/socials/links_dashboard.png"
                  className="rounded-xl border-purple-600"
                  alt="dashboard"
                />
              </div>
            </div>

            <div className="mb-10 max-md:hidden">
              <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 dark:border-gray-700 p-4">
                <div className="relative rounded-3xl bg-s1 dark:bg-[#0b0f1a] px-6 pb-6 pt-10">
                  <span className="download_preview-dot left-6 bg-p2" />
                  <span className="download_preview-dot left-11 bg-s3" />
                  <span className="download_preview-dot left-16 bg-p1/15" />

                  <img
                    src="/images/screen.jpeg"
                    width={855}
                    height={655}
                    alt="screen"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-24 flex justify-center max-lg:hidden">
            {logos.map(({ id, url, width, height, title }: Logo) => (
              <li key={id} className="mx-10">
                <Image
                  src={url}
                  width={width}
                  height={height}
                  alt={title}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Download;
