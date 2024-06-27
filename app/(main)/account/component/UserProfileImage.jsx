"use client"
import { updateProfilePhoto } from "@/app/action/account"
import Loader from "@/components/Loader"
import defaultAvatar from "@/public/images/avatar.jpeg"
import { CameraIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
const UserProfileImage = ({ userName, user }) => {

    const [profileImage, setProfileImage] = useState(user?.image || defaultAvatar)
    const [loading, setLoading] = useState(false)

    const handleProfileImageChange = async (e) => {
        const file = e.target.files[0]
        setLoading(true)
        if (file?.size > 1048576) {
            setLoading(false)
            toast.error("File size exceeds 1MB. Please choose a smaller file.");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const imageDataUrl = reader.result;
                setProfileImage(imageDataUrl);

                try {
                    await updateProfilePhoto(user?.email, imageDataUrl);
                    toast.success("Profile image updated");
                    setLoading(false)
                } catch (error) {
                    toast.error(`Error: ${error.message}`);
                    setLoading(false)
                }
            };
            reader.readAsDataURL(file);
            setLoading(false)
        };

    }

    return (

        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="">
                        <input
                            id="image"
                            name="image"
                            type="file"
                            className="hidden"
                            // onChange="loadFile(event)"
                            onChange={handleProfileImageChange}
                        />

                        <div className="relative size-28 mx-auto">

                            <Image
                                src={profileImage}
                                className="dark:shadow-gray-800 ring-4 ring-lime-600 dark:ring-slate-800 object-cover shadow-2xl overflow-hidden h-[120px] w-[120px] rounded-full"
                                id="profile-banner"
                                alt={userName}
                                width={120}
                                height={120}
                                priority={100}
                            />
                            <label
                                className="absolute cursor-pointer right-0 bottom-[8px] bg-slate-50 p-[2px] rounded-full"
                                htmlFor="image"
                            >
                                <CameraIcon color="#65A30D" size={20} />
                            </label>
                        </div>


                    </div >
                )
            }
        </>

    )
}

export default UserProfileImage
