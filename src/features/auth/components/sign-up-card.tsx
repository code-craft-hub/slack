import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export const SignUpCard = ({
  setState,
}: {
  setState: (state: SignInFlow) => void;
}) => {
  // const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;"'<>,.?/\\]).{6,}$/;

  // console.log(regex.test(""))

  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong.");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" /> <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            onChange={(e) => setName(e.target.value)}
            disabled={pending}
            value={name}
            type="text"
            placeholder="Full Name"
            required
          />
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
          <Input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            disabled={pending}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
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
          Already have an account?
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
