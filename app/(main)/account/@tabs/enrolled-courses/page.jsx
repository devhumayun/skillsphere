import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getLoggedInUserAllEnrollments } from "@/quries/enrollments";
import { getUserByEmail } from "@/quries/user";
import { dbConnect } from "@/services/mongo";
import Link from "next/link";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/EnrolledCourseCard";

async function EnrolledCourses() {

	await dbConnect()
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
					<Link key={enrollment?.id} href={`/courses/${enrollment.course._id.toString()}/lesson`}>
						<EnrolledCourseCard enrollment={enrollment} />
					</Link>
				))
			) : (
				<div className="">
					<p>No enrollment found!</p>
					<Link href={"/courses"}>
						<Button variant="link"> Explore Now </Button>
					</Link>

				</div>
			)}
		</div>
	);
}

export default EnrolledCourses;
