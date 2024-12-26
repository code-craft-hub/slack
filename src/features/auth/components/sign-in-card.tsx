import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@convex-dev/auth/react";

import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";

import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";

export const SignInCard = ({
  setState,
}: {
  setState: (state: SignInFlow) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const { signIn } = useAuthActions();

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <Button
            onClick={() => {}}
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            className="w-full relative border"
            variant={"ghost"}
          >
            <FcGoogle className="absolute size-5 left-2.5 top-1/2 transform -translate-y-1/2" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            className="w-full relative border"
            variant={"ghost"}
          >
            <FaGithub className="absolute size-5 left-2.5 top-1/2 transform -translate-y-1/2" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
