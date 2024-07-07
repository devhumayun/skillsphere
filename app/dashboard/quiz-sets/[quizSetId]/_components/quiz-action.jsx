"use client"

import { deleteQuiz } from "@/app/action/quiz"
import { Button } from "@/components/ui/button"
import QuizEditContext from "@/context/quizContext"
import { Pencil, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { toast } from "sonner"

const QuizAction = ({ quizId, quizSet }) => {
    const [action, setAction] = useState(null)
    const { editQuizData } = useContext(QuizEditContext)
    const router = useRouter()
    const handleQuizAction = async (e) => {
        e.preventDefault()
        try {
            switch (action) {
                case "edit-quiz":
                    await editQuizData(quizId)
                    break;
                case "edit-delete":
                    if (quizSet.active === true) {
                        toast.info("You have to unpublishe this quizset before deleting any items!")
                    } else {
                        await deleteQuiz(quizId, quizSet.id)
                        router.refresh()
                        toast.success("Quiz deleted!")
                    }
                    break

                default:
                    toast.error("Invalid action type!")
                    break;
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="flex items-center justify-end gap-2 mt-6">
            <form onSubmit={handleQuizAction}>
                <Button onClick={() => setAction("edit-quiz")} variant="ghost" size="sm">
                    <Pencil className="w-3 mr-1" /> Edit
                </Button>
                <Button
                    onClick={() => setAction("edit-delete")}
                    size="sm"
                    className="text-destructive"
                    variant="ghost"
                >
                    <Trash className="w-3 mr-1" /> Delete
                </Button>
            </form>
        </div>
    )
}

export default QuizAction
