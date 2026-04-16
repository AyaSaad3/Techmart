"use client"

import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import apiServices from "@/services/api"
import { SignUpData } from "@/interfaces/signup/SignUpData"

export default function SignUp() {
  const form = useForm<SignUpData>({})

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(data: SignUpData) {
    setErrorMessage(null)
    setIsLoading(true)

    if (data.password !== data.rePassword) {
      setErrorMessage("Passwords do not match")
      setIsLoading(false)
      return
    }

    const response = await apiServices.signUp(data)

    if (response.message == "success") {
      router.push("/auth/signin")
    } else {
      setErrorMessage(response.message || null)
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full sm:max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-center text-md font-bold">
            Sign up to start your shopping experience.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-[16px]">Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Your name"
                      className="focus-visible:ring-indigo-200"
                    />
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-[16px]">Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="your-email@example.com"
                      className="focus-visible:ring-indigo-200"
                    />
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-[16px]">Phone</FieldLabel>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className="focus-visible:ring-indigo-200"
                    />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-[16px]">Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      className="focus-visible:ring-indigo-200"
                    />
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-[16px]">Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      className="focus-visible:ring-indigo-200"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="bg-white border-0">
          <Field orientation="horizontal" className="grid grid-cols-1">
            <Button
              disabled={isLoading}
              type="submit"
              form="signup-form"
              className="bg-indigo-500 text-lg py-4.5 hover:bg-indigo-700"
            >
              {isLoading
                ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white me-1"></div>
                : "Sign Up"
              }
            </Button>

            <div className="text-center text-[16px]">
              <span>Already have an account? </span>
              <Link href="/auth/signin" className="text-indigo-500">
                Sign in
              </Link>
            </div>

            {errorMessage && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 text-center">
                {errorMessage}
              </div>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}