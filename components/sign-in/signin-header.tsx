import { GalleryVerticalEnd } from "lucide-react";

const SignInHeader = () => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <p className="text-muted-foreground text-sm">
        Ready for real-world experience? Sign in to manage your application or start a new one.
      </p>
    </div>
  );
};

export default SignInHeader;