import { ENROLLMENT, instructorDashboardData } from "@/lib/dashboardHelper";
import { getCourseDetails } from "@/quries/course";
import { dbConnect } from "@/services/mongo";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
export const dynamic = 'force-dynamic';

const EnrollmentsPage = async ({ params: { courseId } }) => {

  await dbConnect()
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
