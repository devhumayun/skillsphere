
import { CourseProgress } from "@/components/CourseProgress";

import { getLoggedInUser } from "@/lib/loggedInUser";
import { Watch } from "@/models/watch-model";
import { getCourseDetails } from "@/quries/course";
import { getAReport } from "@/quries/report";
import { DownloadCertificate } from "./download-certificate";
import { GiveReview } from "./give-review";
import { ModulesSidebar } from "./modules-sidebar";
import Quiz from "./quiz";

export const CourseSidebar = async ({ courseId }) => {

  const course = await getCourseDetails(courseId)
  const loggedInUser = await getLoggedInUser()

  const updatedModules = await Promise.all(course?.modules.map(async (module) => {
    const moduleId = module._id.toString()
    const lessons = module?.lessonIds

    const updatedLesson = await Promise.all(lessons.map(async (lesson) => {
      const lessonId = lesson._id.toString()

      const watch = await Watch.findOne({ module: moduleId, lesson: lessonId, user: loggedInUser.id })

      if (watch?.state === 'completed') {
        lesson.state = "completed"
      }

      return lesson

    }))
    return module
  }))

  const report = await getAReport({ course: courseId, student: loggedInUser.id })
  const completedModule = report?.totalCompletedModeules?.length ?? 0
  const totalModulesInCourse = course?.modules ? course.modules.length : 0;

  // attempted In quiz
  const totalQuizAssessments = report?.quizAssessment?.assessments
  const quizzesTaken = totalQuizAssessments ? totalQuizAssessments?.filter(a => a.attempted) : []

  // find quiz correct answer
  const quizCorrect = quizzesTaken?.map((quiz) => {
    const item = quiz.options
    return item?.filter((o) => {
      return o.isCorrect === true && o.isSelected === true
    })
  })?.filter(e => e.length > 0).flat()

  const markFromQuiz = quizCorrect.length * 5

  const courseProgress = completedModule > 0 ? (completedModule / totalModulesInCourse) * 100 : 0

  const quizSet = course?.quizSet;
  const isQuizComplete = report?.quizAssessment ? true : false;

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-bold lg:hidden">SkillSphers</h1>
          {
            <div className="mt-10">
              <CourseProgress variant="success" value={courseProgress} />
            </div>
          }
        </div>
        <ModulesSidebar courseId={courseId} modules={updatedModules} />
        <div className="w-full px-6">
          <DownloadCertificate courseProgress={courseProgress} courseId={courseId} />
          <GiveReview />
        </div>
        <div className="px-6 pt-4">
          {
            quizSet &&
            <Quiz courseProgress={courseProgress} course={course} quizSet={quizSet} isTaken={isQuizComplete} markFromQuiz={markFromQuiz} />
          }
        </div>
      </div>

    </>
  );
};
