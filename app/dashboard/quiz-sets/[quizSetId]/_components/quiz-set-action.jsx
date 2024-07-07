"use client";

import { Trash } from "lucide-react";

import { deleteQuizSet, updateQuizSetStatus } from "@/app/action/quiz";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const QuizSetAction = ({ quizSet }) => {

  const [action, setAction] = useState()
  const [publish, setPublish] = useState(quizSet?.active)
  const router = useRouter()

  const handleQuizSetAction = async (e) => {
    e.preventDefault()
    try {
      switch (action) {
        case "change-quizset-status":
          const activeStatus = await updateQuizSetStatus(quizSet?.id)
          setPublish(!activeStatus)
          toast.success("Quiz Set status updated!")
          router.refresh()
          break;

        case "delete-quizset":

          await deleteQuizSet(quizSet?.id)
          toast.success("Quiz set deleted!")
          router.push("/dashboard/quiz-sets")
          break;

        default:
          toast.error("Invalid action type")
          break;
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <form onSubmit={handleQuizSetAction}>
      <div className="flex items-center gap-x-2">
        <Button onClick={() => setAction("change-quizset-status")} variant="outline" size="sm">
          {publish ? "Unpublish" : "Publish"}
        </Button>

        <Button onClick={() => setAction("delete-quizset")} size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
