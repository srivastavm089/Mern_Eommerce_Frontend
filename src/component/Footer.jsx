import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {} from "react-icons/fa6";
const FooterComp = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 ">
      <div className="mx-auto  px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-16 lg:max-w-none lg:grid-cols-3 items-center">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome to Dudo
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Stay Connected with us
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <a href="https://www.facebook.com/abhay.srivastav.98229/"> <FaFacebook className="text-white opacity-30 hover:opacity-100 cursor-pointer " /></a>
             <a href="https://www.instagram.com/srivastavm089/"> <FaInstagram className="text-white opacity-30 hover:opacity-100 cursor-pointer" /></a>
             <a href="https://twitter.com/abhaysr56566778">  <FaTwitter className="text-white opacity-30 hover:opacity-100 cursor-pointer" /></a>
            
              <a href="https://github.com/srivastavm089"><FaGithub className="text-white opacity-30 hover:opacity-100 cursor-pointer" /></a>
              
            
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-56 gap-y-10 sm:grid-cols-4 lg:pt-2">
            <div className="flex flex-col items-start">
              <dt className="mt-4 font-semibold text-white">Solution</dt>
              <dd className="mt-5 flex flex-col gap-5 leading-7 text-gray-400">
                <p className="hover:text-white  cursor-pointer">Marketing</p>
                <p className="hover:text-white  cursor-pointer">Analytics</p>
                <p className="hover:text-white  cursor-pointer">Commerce</p>
                <p className="hover:text-white  cursor-pointer">Insight</p>
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <dt className="mt-4 font-semibold text-white">Support</dt>
              <dd className="mt-5 flex flex-col gap-5 leading-7 text-gray-400">
                <p className="hover:text-white  cursor-pointer">Pricing</p>
                <p className="hover:text-white  cursor-pointer">
                  Documentation
                </p>
                <p className="hover:text-white  cursor-pointer">Guides</p>

                <p className="hover:text-white  cursor-pointer">Api Status</p>
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <dt className="mt-4 font-semibold text-white">Company</dt>
              <dd className="mt-5 flex flex-col gap-5 leading-7 text-gray-400">
                <p className="hover:text-white  cursor-pointer">About</p>
                <p className="hover:text-white  cursor-pointer">Blog</p>
                <p className="hover:text-white  cursor-pointer">Jobs</p>

                <p className="hover:text-white  cursor-pointer">Press</p>
                <p className="hover:text-white  cursor-pointer">Partners</p>
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <dt className="mt-4 font-semibold text-white">Legal</dt>
              <dd className="mt-5 flex flex-col gap-5 leading-7 text-gray-400">
                <p className="hover:text-white  cursor-pointer">Claim</p>
                <p className="hover:text-white  cursor-pointer">Privacy</p>
                <p className="hover:text-white  cursor-pointer">Terms</p>

                <p className="hover:text-white  cursor-pointer">Press</p>
                <p className="hover:text-white  cursor-pointer">Partners</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

export default FooterComp;
