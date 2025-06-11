"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { SignUpForm } from "@/components/sign-up/signup-form";

const SignUpPage = () => {
  return (
    <>
      <style>
        {`
          .animated-gradient {
            background: linear-gradient(
              45deg,
              #623987,
              #954493,
              #DD489A,
              #FFFFFF
            );
            background-size: 400%;
            animation: gradientAnimation 15s ease infinite;
          }

          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .dark .animated-gradient {
            filter: brightness(0.75);
          }
        `}
      </style>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Sarastya Agility.
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignUpForm />
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block h-full animated-gradient">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/sarastya-logo.png"
              alt="Sarastya Agility Logo"
              className="w-auto h-auto max-w-[16rem] max-h-[16rem] md:max-w-[20rem] md:max-h-[20rem] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;