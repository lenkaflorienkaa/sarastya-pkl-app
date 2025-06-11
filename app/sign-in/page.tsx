import { GalleryVerticalEnd } from "lucide-react";
import { SignInForm } from "@/components/sign-in/signin-form";
import SignInHeader from "@/components/sign-in/signin-header";
import SignInBackground from "@/components/sign-in/signin-background";

const SignInPage = () => {
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
              <SignInForm />
            </div>
          </div>
        </div>
        <SignInBackground />
      </div>
    </>
  );
};

export default SignInPage;