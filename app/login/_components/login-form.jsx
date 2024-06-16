"use client"
import { credentailsLogin } from "@/app/action";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export function LoginForm() {

  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      setLoading(true)
      const response = await credentailsLogin(formData)
      if (!!response.error) {
        setErrorMsg("Invalid email or password!")
        setLoading(false)
      } else {
        router.push("/courses")
        setLoading(false)
      }

    } catch (error) {
      setErrorMsg("Invalid email or password!")
      setLoading(false)
    }

  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      {errorMsg &&
        <div className="mx-5 mb-4 flex items-center justify-between bg-red-200 p-2 rounded-md">
          <p>{errorMsg}</p>
          <Image src={"/images/errorImage.png"} alt={errorMsg} height={20} width={20} />
        </div>
      }
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input id="password" type={showPass ? "text" : "password"} required name="password" />
              <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-[20px] cursor-pointer">
                {
                  showPass ? <IoEyeOff /> : <IoEye />
                }

              </span>
            </div>
            <Button type="submit" className="w-full">
              {
                loading ? <Loader /> : "Login"
              }
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}Register as an
          <div className="flex justify-center gap-3 mt-2">
            <Link className="underline" href={"/register/instructor"}>Instructor</Link>
            or
            <Link className="underline" href={"/register/student"}>Student</Link>

          </div>


        </div>
      </CardContent>
    </Card>
  );
}
