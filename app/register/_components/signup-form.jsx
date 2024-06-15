"use client"
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

export function SignupForm({ role }) {

  const [errorMsg, setErrorMsg] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const hnadleRegister = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const firstName = formData.get("first-name")
    const lastName = formData.get("last-name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")
    const userRole = role

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setErrorMsg("All fields are requried!")
      setLoading(false)
    } else {

      if (password !== confirmPassword) {
        return setErrorMsg("Password not matched!")
        setLoading(false)
      } else {
        setLoading(true)
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName, lastName, email, password, userRole
          })
        })

        if (res.status === 201) {
          router.push("/login")
          setLoading(false)
        }
      }

    }

  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      {errorMsg &&
        <div className="mx-5 mb-4 flex items-center justify-between bg-red-200 p-2 rounded-md">
          <p>{errorMsg}</p>
          <Image src={"/images/errorImage.png"} alt={errorMsg} height={20} width={20} />
        </div>
      }
      <CardContent>
        <form onSubmit={hnadleRegister}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" name="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" name="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type={showPass ? "password" : "text"} />
              <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-[20px] cursor-pointer">
                {
                  showPass ? <IoEye /> : <IoEyeOff />
                }

              </span>
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type={showPass ? "password" : "text"} />
              <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-[20px] cursor-pointer">
                {
                  showPass ? <IoEye /> : <IoEyeOff />
                }

              </span>
            </div>
            <Button type="submit" className="w-full">
              {
                loading ? <Loader /> : "Create an account"
              }

            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
