"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn components
import { Card } from "@/components/ui/card"; // Removed CardContent as we control layout manually now

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "@/../public/assets/images/logo-black.png";
import Image from "next/image";
import { zSchema } from "@/lib/zodValidation";
import ButtonLoader from "@/components/Applications/ButtonLoader";
import { z } from "zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoutes";
import axios from "axios";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  let formSchema = zSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z
        .string()
        .min(8, "Confirm Password must be at least 8 characters"),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleLoginSubmit(datas) {
    try {
      setLoading(true);
      const {data: responseR} = await axios.post("/api/auth/register", datas)
      if(!responseR.success){
        throw new Error(responseR.message)
      }
      form.reset();
      alert(responseR.message)
    } catch (error) {
      alert(error.message)
    } finally{ 
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full min-w-4xl rounded-4xl shadow-[0px_48px_100px_0px_rgba(17,12,46,0.15)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* --- LEFT SIDE: Image & Title --- */}
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
                <span className="text-red-600">Register</span> Here
                <span className="text-red-600">!</span>
              </h1>
              <p className="text-lg font-medium text-gray-600">
                Register Your Account & Enjoy your{" "}
                <span className="text-red-600">Shopping!</span>
              </p>
            </div>
          </div>

          {/* --- RIGHT SIDE: Form Controllers --- */}
          <div className="p-8 md:p-12 bg-white">
            <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
              
              {/* Name Field */}
              <div className="mb-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-md mb-1 block">
                        Full Name:-
                      </FieldLabel>
                      <Input
                        type="text"
                        {...field}
                        placeholder="full name..."
                        className="w-full"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-md mb-1 block">
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

              {/* Password Field */}
              <div className="mb-4">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-md mb-1 block">
                        Password:-
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          type="password"
                          {...field}
                          className="pr-10 w-full"
                          placeholder="**************"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-8">
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-md mb-1 block">
                        Confirm Password:-
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          {...field}
                          className="pr-10 w-full"
                          placeholder="**************"
                        />
                        <button
                          type="button" 
                          onClick={() => setIsTypePassword(!isTypePassword)}
                          className="absolute cursor-pointer text-xl right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
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

              <div className="flex justify-center">
                <ButtonLoader
                  type="submit"
                  text={!loading ? "Submit" : "Submitting"}
                  // Removed onClick={handleLoginSubmit} because form.handleSubmit handles it
                  loading={loading}
                  className="cursor-pointer text-md py-4 w-full"
                />
              </div>

              <div className="text-center mt-6">
                <div className="flex justify-center gap-2 items-center">
                  <p className="text-md font-semibold text-gray-600">Already have an account?</p>
                  <Link
                    href={WEBSITE_LOGIN}
                    className="text-red-600 text-md underline font-semibold hover:text-red-800"
                  >
                    Login!
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;