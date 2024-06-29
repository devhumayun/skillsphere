import { REVIEW, instructorDashboardData } from "@/lib/dashboardHelper";
import { getCourseDetails } from "@/quries/course";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const reviews = [
  {
    id: 1,
    student: { name: "John Doe" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
  {
    id: 1,
    student: { name: "John Smilga" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
];
const ReviewsPage = async ({ params: { courseId } }) => {

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
