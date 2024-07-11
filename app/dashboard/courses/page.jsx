import { COURSES_DATA, instructorDashboardData } from "@/lib/dashboardHelper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const dynamic = 'force-dynamic';

const CoursesPage = async () => {

  const courses = await instructorDashboardData(COURSES_DATA)

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
