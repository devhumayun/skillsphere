import { getCourseDetails } from "@/quries/course";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);

  return (
    <>
      <CourseDetailsIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />

      <CourseDetails course={course} />

      {/* Testimonials */}
      <Testimonials />
      {/* Releated Course */}
      <RelatedCourse />
      {/* Authors */}
      {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
      {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
    </>
  );
};
export default SingleCoursePage;
