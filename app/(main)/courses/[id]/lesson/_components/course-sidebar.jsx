
import { CourseProgress } from "@/components/CourseProgress";

import { getLoggedInUser } from "@/lib/loggedInUser";
import { Watch } from "@/models/watch-model";
import { getCourseDetails } from "@/quries/course";
import { getAReport } from "@/quries/report";
import { DownloadCertificate } from "./download-certificate";
import { GiveReview } from "./give-review";
import { ModulesSidebar } from "./modules-sidebar";

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
  const totalModulesInCourse = course?.modules.length

  const courseProgress = completedModule > 0 ? (completedModule / totalModulesInCourse) * 100 : 0

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
      </div>

    </>
  );
};
