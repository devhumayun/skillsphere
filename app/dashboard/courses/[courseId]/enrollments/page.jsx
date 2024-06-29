import { ENROLLMENT, instructorDashboardData } from "@/lib/dashboardHelper";
import { getCourseDetails } from "@/quries/course";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const enrollments = [
  {
    id: 1,
    date: "10 Nov 2022",
    student: {
      name: "John Doe",
      email: "Dp5kz@example.com",
      progress: "10%",
      quizMark: 80,
    },
  },
  {
    id: 1,
    date: "10 Nov 2022",
    student: {
      name: "John Smilga",
      email: "johnsmilga@gmail.com",
      progress: "80%",
      quizMark: 50,
    },
  },
];
const EnrollmentsPage = async ({ params: { courseId } }) => {

  const course = await getCourseDetails(courseId)

  const allEnrollment = await instructorDashboardData(ENROLLMENT)

  const enrollmentForThisCourse = allEnrollment?.filter((enrollment) => enrollment?.course.toString() === courseId)

  console.log(enrollmentForThisCourse);

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentForThisCourse} />
    </div>
  );
};

export default EnrollmentsPage;
