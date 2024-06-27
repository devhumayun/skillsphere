import { auth } from "@/auth";
import { getLoggedInUserAllEnrollments } from "@/quries/enrollments";
import { getUserByEmail } from "@/quries/user";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/EnrolledCourseCard";

async function EnrolledCourses() {
	const session = await auth();
	if (!session?.user) {
		redirect("/login");
	}
	const loggedInUser = await getUserByEmail(session?.user?.email);

	const enrollments = await getLoggedInUserAllEnrollments(loggedInUser?.id);

	return (
		<div className="grid sm:grid-cols-2 gap-6">
			{enrollments.length > 0 ? (
				enrollments.map((enrollment) => (
					<EnrolledCourseCard key={enrollment?.id} enrollment={enrollment} />
				))
			) : (
				<div>
					<p>No enrollment found!</p>
				</div>
			)}
		</div>
	);
}

export default EnrolledCourses;
