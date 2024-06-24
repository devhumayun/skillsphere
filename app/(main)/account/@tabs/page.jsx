import { auth } from "@/auth";
import { getUserByEmail } from "@/quries/user";
import ContactInfo from "../component/ContactInfo";
import PasswordChange from "../component/PasswordChange";
import PersonalDetails from "../component/PersonalDetails";

async function Profile() {

	const session = await auth()

	const loggedInUser = await getUserByEmail(session?.user?.email)

	return (
		<>
			<PersonalDetails userInfo={loggedInUser} />
			<div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
					<ContactInfo user={loggedInUser} />
					<PasswordChange user={loggedInUser} />
				</div>
			</div>
		</>
	);
}

export default Profile;
