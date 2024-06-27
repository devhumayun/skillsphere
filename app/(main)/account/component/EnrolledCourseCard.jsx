import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/quries/category";
import { getAReport } from "@/quries/report";
import { getUserByEmail } from "@/quries/user";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const EnrolledCourseCard = async ({ enrollment }) => {
    // get category details
    const category = await getCategory(enrollment?.course?.category._id)
    const session = await auth()
    const loggedInUser = await getUserByEmail(session?.user?.email)

    const filtered = {
        course: enrollment?.course?._id.toString(),
        student: loggedInUser?.id
    }

    // get reports by filtered
    const report = await getAReport(filtered)


    const totalQuizAssessments = report?.quizAssessment?.assessments

    // total quiz
    const totalQuiz = report?.quizAssessment?.assessments?.length

    // quiz attempted
    const quizzesTaken = totalQuizAssessments?.filter(a => a.attempted)

    // find out correct quizzes

    const totalCorrect = quizzesTaken?.map(quiz => {
        const item = quiz.options
        return item?.filter(o => {
            return o.isCorrect === true && o.isSelected === true
        })
    })?.filter(element => element.length > 0).flat()

    // total quizzes mark
    const markFromQuizzes = totalCorrect?.length * 5

    // total marks
    const totalMarks = report?.quizAssessment?.otherMarks + markFromQuizzes

    return (
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                    src={`/images/courses/${enrollment?.course?.thumbnail}`}
                    alt={"course"}
                    className="object-cover"
                    fill
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                    {enrollment?.course?.title}
                </div>
                <p className="text-xs text-muted-foreground">{category?.title}</p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <div>
                            <BookOpen className="w-4" />
                        </div>
                        <span>{enrollment?.course?.modules?.length} {enrollment?.course?.modules?.length >= 1 ? "Chapter" : "Chapters"}</span>
                    </div>
                </div>
                <div className=" border-b pb-2 mb-2">
                    <div className="flex items-center justify-between">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Total Modules: {enrollment?.course?.modules?.length}
                        </p>
                        <span className="text-md md:text-sm font-medium text-slate-700">
                            Completed Modules <Badge variant="success">{report?.totalCompletedModeules?.length ? report?.totalCompletedModeules?.length : 0}</Badge>
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Total Quizzes: {totalQuiz ? totalQuiz : 0}
                        </p>

                        <span className="text-md md:text-sm font-medium text-slate-700">
                            Quiz taken <Badge variant="success">{quizzesTaken?.length ? quizzesTaken?.length : 0}</Badge>
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Mark from Quizzes
                        </p>

                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {markFromQuizzes ? markFromQuizzes : 0}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Others
                        </p>

                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {report?.quizAssessment?.otherMarks ? report?.quizAssessment?.otherMarks : 0}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-md md:text-sm font-medium text-slate-700">
                        Total Marks
                    </p>

                    <p className="text-md md:text-sm font-medium text-slate-700">
                        {totalMarks ? totalMarks : 0}
                    </p>
                </div>

                {/* <CourseProgress
						size="sm"
						value={80}
						variant={110 === 100 ? "success" : ""}
					/> */}
            </div>
        </div>
    )
}

export default EnrolledCourseCard
