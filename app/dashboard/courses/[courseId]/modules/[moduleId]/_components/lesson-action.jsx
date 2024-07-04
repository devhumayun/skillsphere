"use client";

import { Trash } from "lucide-react";

import { deleteLesson, updateLessonStatus } from "@/app/action/lesson";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {

    const [action, setAction] = useState(null)
    const [published, setPublished] = useState(lesson?.active)
    const router = useRouter()

    const handleAction = async (e) => {
        e.preventDefault()
        try {

            switch (action) {
                case "changedLessonStatus":
                    const result = await updateLessonStatus(lesson?.id)
                    setPublished(!result)
                    toast.success(`${lesson?.title} published successfully!`)
                    router.refresh()
                    break;

                case "deleteLesson":
                    if (published === true) {
                        toast.info("Unpublished first for deleting this lesson")
                    } else {
                        await deleteLesson(lesson?.id, moduleId)
                        onDelete()
                    }

                default:
                    break;
            }

        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <form onSubmit={handleAction}>
            <div className="flex items-center gap-x-2">
                <Button onClick={() => setAction("changedLessonStatus")} variant="outline" size="sm">
                    {published ? "Unpublish" : "Publish"}
                </Button>

                <Button onClick={() => setAction("deleteLesson")} size="sm">
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
