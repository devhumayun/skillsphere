"use client"

import { updateUserInfo } from "@/app/action/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
const PersonalDetails = ({ userInfo }) => {


    let firstName
    let lastName

    if (userInfo?.name) {
        const nameArr = userInfo?.name.split(" ")
        firstName = userInfo?.firstName || nameArr.slice(0, 1).join(" ")
        lastName = userInfo?.lastName || nameArr.slice(1,).join(" ")
    } else {
        firstName = userInfo?.firstName
        lastName = userInfo?.lastName
    }

    const [userDetails, setUserDetails] = useState({
        firstName: firstName || "",
        lastName: lastName || "",
        email: userInfo?.email,
        bio: userInfo?.bio || "",
        designation: userInfo?.designation || "",
    })

    const handleInputChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setUserDetails({
            ...userDetails,
            [field]: value
        })
    }

    const handlePersonalInfoUpdate = async (e) => {

        e.preventDefault()
        try {
            await updateUserInfo(userInfo?.email, userDetails)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
            <form onSubmit={handlePersonalInfoUpdate}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">
                            First Name : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="First Name:"
                            id="firstName"
                            name="firstName"
                            required
                            value={userDetails?.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Last Name : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Last Name:"
                            id="lastName"
                            name="lastName"
                            required
                            value={userDetails?.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Your Email : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            readOnly
                            value={userDetails?.email}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Occupation :</Label>
                        <Input
                            name="designation"
                            id="designation"
                            type="text"
                            placeholder="Occupation :"
                            value={userDetails?.designation}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {/*end grid*/}
                <div className="grid grid-cols-1">
                    <div className="mt-5">
                        <Label className="mb-2 block">Description :</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Write your bio :"
                            value={userDetails?.bio}
                            onChange={handleInputChange}

                        />
                    </div>
                </div>
                {/*end row*/}
                <Button className="mt-5" asChild>
                    <input type="submit" name="send" value="Save Changes" />
                </Button>
            </form>
            {/*end form*/}
        </div>
    )
}

export default PersonalDetails
