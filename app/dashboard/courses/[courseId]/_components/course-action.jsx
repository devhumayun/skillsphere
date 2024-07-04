"use client";

import { Trash } from "lucide-react";

import { deleteCourse, updateCourseStatus } from "@/app/action/course";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CourseActions = ({ course }) => {

  const [action, setAction] = useState(null)
  const [publishe, setPublish] = useState(course?.active)
  const router = useRouter()

  const handleCourseAction = async (e) => {
    e.preventDefault()
    try {
      switch (action) {
        case "change-course-status":
          const activeStatus = await updateCourseStatus(course?.id)
          setPublish(!activeStatus)
          toast.success("Course status updated!")
          router.refresh()
          break;

        default:
          if (publishe) {
            toast.info("You have to unpublish first for deleting this course")
          } else {
            await deleteCourse(course?.id)
            router.push("/dashboard/courses")
            router.refresh()
            break;
          }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleCourseAction}>
      <div className="flex items-center gap-x-2">
        <Button onClick={() => setAction("change-course-status")} variant="outline" size="sm">
          {publishe ? "Unpublish" : "Publish"}
        </Button>

        <Button onClick={() => setAction("delete-course")} size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
