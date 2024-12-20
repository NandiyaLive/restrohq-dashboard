"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Icon } from "@iconify/react";
import LogoWithText from "@/components/common/logo-with-text";
import { useRouter } from "next/navigation";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

const Page = () => {
  const router = useRouter();

  const { data: restaurant } = useGetRestaurantQuery();
  const { signIn } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

    signIn(values);
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <LogoWithText asLink />

      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Or sign in with
          </p>

          <Button className="w-full mt-2" variant="secondary">
            <Icon icon="devicon:google" />
            <span>Google</span>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
