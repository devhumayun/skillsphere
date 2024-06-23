"use client"
import { createCheckoutSession } from "@/app/action/stripe"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"

const CourseEnrollAction = ({ isLink, courseId }) => {

    const enrollFormAction = async (data) => {
        const { url } = await createCheckoutSession(data)
        window.location.assign(url)
    }

    return (<>
        <form action={enrollFormAction}>
            <input type="hidden" name="courseId" value={courseId} />
            {
                isLink ? (<Button
                    type="submit"
                    variant="ghost"
                    className="text-xs text-sky-700 h-7 gap-1"
                >
                    Enroll
                    < ArrowRight className="w-3" />
                </Button >) : (<Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
                    Enroll Now
                </Button>)
            }
        </form>
    </>
    )
}

export default CourseEnrollAction
