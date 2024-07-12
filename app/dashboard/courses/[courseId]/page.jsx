import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { getCategories } from "@/quries/category";
import { getCourseDetails } from "@/quries/course";
import { getAllQuizSets } from "@/quries/quizzes";
import { dbConnect } from "@/services/mongo";
import {
  CircleDollarSign,
  LayoutDashboard,
  ListChecks
} from "lucide-react";
import { CategoryForm } from "./_components/category-form";
import { CourseActions } from "./_components/course-action";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { QuizSetForm } from "./_components/quiz-set-form";
import { TitleForm } from "./_components/title-form";

const EditCourse = async ({ params: { courseId } }) => {

  await dbConnect()
  const course = await getCourseDetails(courseId)
  const categories = await getCategories()
  const mappedCategories = categories.map(c => {
    return {
      value: c.title,
      label: c.title,
      id: c.id,
    }
  });

  const modules = replaceMongoIdInArray(course?.modules).sort((a, b) => a.order - b.order)

  const allActiveQuizSet = await getAllQuizSets(true)
  let quizSets = []

  if (allActiveQuizSet && allActiveQuizSet.length > 0) {
    quizSets = allActiveQuizSet.map((quizSet) => {
      return {
        value: quizSet.id,
        label: quizSet.title
      }
    })
  }


  return (
    <>

      {!course?.active && <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />}
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions course={course} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: course?.title,
              }}
              courseId={courseId}
            />
            <DescriptionForm initialData={{
              description: course?.description
            }} courseId={courseId} />
            <ImageForm initialData={{ imageUrl: `/images/courses/${course?.thumbnail}` }} courseId={courseId} />
            <CategoryForm initialData={{ value: course?.category?.title }} courseId={courseId} options={mappedCategories} />

            <QuizSetForm initialData={{ quizSetId: course?.quizSet?._id.toString() }} courseId={courseId} options={quizSets} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModulesForm initialData={modules} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm initialData={course?.price} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditCourse;
