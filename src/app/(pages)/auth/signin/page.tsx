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
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function SignIn() {

    const form = useForm({})
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    
    async function onSubmit(data: any) {
        setIsLoading(true)
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (response?.ok) {
            router.push("/")
        } else {
            setErrorMessage(response?.error || null)
        }
        setIsLoading(false)
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="w-full sm:max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Welcom Back!</CardTitle>
                    <CardDescription className="text-center text-md font-bold">
                        Sign in to continue your shopping experience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title" className="text-[16px]">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="your-email@example.com"
                                            type="email"
                                            className="focus-visible:ring-indigo-200"
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title" className="text-[16px]">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="**********"
                                            type="password"
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
                        <Button disabled={isLoading} type="submit" form="form-rhf-demo" className="bg-indigo-500 text-lg py-4.5 hover:bg-indigo-700">
                            {isLoading
                                ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white me-1"></div>
                                : "Sign In"
                            }
                        </Button>
                        <div className="text-center text-[16px]">
                            <span>New to Techmart? </span>
                            <Link href="/auth/signup" className="text-indigo-500">Create an account</Link>
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
