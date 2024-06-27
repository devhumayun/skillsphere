import { getCourseDetails } from "@/quries/course";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);
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
