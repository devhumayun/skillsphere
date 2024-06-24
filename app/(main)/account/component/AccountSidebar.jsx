import { auth } from "@/auth"

import { getUserByEmail } from "@/quries/user"
import { redirect } from "next/navigation"
import UserProfileImage from "./UserProfileImage"
import Menu from "./account-menu"

const AccountSidebar = async () => {

    const session = await auth()
    if (!session) {
        return redirect("/login")
    }

    const loggedInUser = await getUserByEmail(session?.user?.email)
    let userName
    if (loggedInUser?.firstName && loggedInUser?.lastName) {
        userName = `${loggedInUser?.firstName}  ${loggedInUser?.lastName}`
    } else {
        userName = loggedInUser?.name
    }
    const userImage = loggedInUser?.image

    const handleImageChange = async (e) => {
        console.log(e.target.file);
    }


    return (
        <div className="lg:w-1/4 md:px-3">
            <div className="relative">
                <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                    <div className="profile-pic text-center mb-5">

                        <UserProfileImage user={loggedInUser} userName={userName} />
                        <div>

                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">
                                    {userName}
                                </h5>
                                <p className="text-slate-400">
                                    {loggedInUser?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <Menu />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSidebar
