import { getCourseDetails } from "@/quries/course";
import { redirect } from "next/navigation";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);

  // check : this course is active or not
  if (course?.active === false) {
    return redirect("/courses");
  }

  return (
    <>
      <CourseDetailsIntro course={course} />
      <CourseDetails course={course} />
      {course?.testimonials && (
        <Testimonials testimonials={course.testimonials} />
      )}
      <RelatedCourse />
    </>
  );
};
export default SingleCoursePage;
