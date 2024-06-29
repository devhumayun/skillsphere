import { COURSES_DATA, instructorDashboardData } from "@/lib/dashboardHelper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const courses = [
  {
    id: 1,
    title: "Reactive Accelerator",
    price: 49,
    isPublished: true,
  },
  {
    id: 2,
    title: "Think In A Redux Way",
    price: 10,
    isPublished: false,
  },
];
const CoursesPage = async () => {

  const courses = await instructorDashboardData(COURSES_DATA)

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
