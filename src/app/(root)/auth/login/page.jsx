"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn components
import { Card, CardContent } from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Logo from "@/../public/assets/images/logo-black.png";
import Image from "next/image";
import { zSchema } from "@/lib/zodValidation";
import ButtonLoader from "@/components/Applications/ButtonLoader";
import { z } from "zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoutes";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  let formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(1, "Password is required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleLoginSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full min-w-4xl rounded-4xl shadow-[0px_48px_100px_0px_rgba(17,12,46,0.15)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center items-center p-8 md:p-12 text-center border-b md:border-b-0 md:border-r border-gray-300">
            <div className="mb-6">
              <Image
                src={Logo}
                height={Logo.height}
                width={Logo.width}
                alt="logo"
                className="w-48 object-contain"
              />
            </div>

            <div>
              <h1 className="font-bold text-3xl pb-3">
                <span className="text-red-600">Login</span> Here
                <span className="text-red-600">!</span>
              </h1>
              <p className="text-lg font-medium text-gray-600">
                Login Your Account & Enjoy your{" "}
                <span className="text-red-600">Shopping!</span>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-12 bg-white">
            <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
              {/* Email */}
              <div className="mb-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-md mb-1 block">
                        Email:-
                      </FieldLabel>
                      <Input
                        type="email"
                        {...field}
                        placeholder="email address..."
                        className="w-full"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Password */}
              <div className="mb-8">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-md mb-1 block">
                        Password:-
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          {...field}
                          className="pr-10 w-full"
                          placeholder="**************"
                        />
                        <button
                          type="submit"
                          onClick={() => setIsTypePassword(!isTypePassword)}
                          className="absolute cursor-pointer text-xl right-3 top-1/2 -translate-y-1/2 text-red-500"
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <ButtonLoader
                type="submit"
                text={!loading ? "Submit" : "Submitting..."}
                loading={loading}
                className="cursor-pointer text-md py-4 w-full"
              />

              <div className="text-center mt-6 space-y-2">
                <div className="flex justify-center gap-2 items-center">
                  <p className="text-md font-semibold text-gray-600">
                    Don't have an account?
                  </p>
                  <Link
                    href={WEBSITE_REGISTER}
                    className="text-red-600 underline font-semibold"
                  >
                    Create Account
                  </Link>
                </div>

                <Link href="#" className="text-red-600 underline font-semibold">
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
