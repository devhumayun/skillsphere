import { formattedMyTimeDuration } from "@/lib/formateTime";
import { cn } from "@/lib/utils";
import { getLesson } from "@/quries/lession";
import { Tv } from "lucide-react";

const CourseLessonList = async ({ lessonId }) => {
    const lesson = await getLesson(lessonId)
    return (
        <button
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
            )}
        >
            <div className="flex gap-5">

                <Tv size={16} className={cn("text-slate-500")} />
                <div className="flex flex-col items-start">
                    <span>  {lesson?.title}</span>
                    <span>{formattedMyTimeDuration(lesson?.duration)}</span>
                </div>
            </div>
        </button>
    )
}

export default CourseLessonList
