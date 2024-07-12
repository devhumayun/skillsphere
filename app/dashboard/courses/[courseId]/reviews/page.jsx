import { REVIEW, instructorDashboardData } from "@/lib/dashboardHelper";
import { getCourseDetails } from "@/quries/course";
import { dbConnect } from "@/services/mongo";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";


const ReviewsPage = async ({ params: { courseId } }) => {

  await dbConnect()
  const course = await getCourseDetails(courseId)

  const reviewData = await instructorDashboardData(REVIEW)

  const reviewdForACourse = reviewData.filter((review) => review?.courseId.toString() === courseId)

  return (
    <div className="p-6">
      <h2 className="font-bold">{course?.title}</h2>
      <DataTable columns={columns} data={reviewdForACourse} />
    </div>
  );
};

export default ReviewsPage;
