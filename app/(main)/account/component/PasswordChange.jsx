"use client"

import { updateUserPassword } from "@/app/action/account"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

const PasswordChange = ({ user }) => {

    const [changePass, setChangePass] = useState({
        "oldPassword": "",
        "newPassword": "",
        "reTypePass": ""
    })

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setChangePass({
            ...changePass,
            [field]: value
        })
    }

    const handleChangepassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (changePass.newPassword != changePass.reTypePass) {
            setLoading(false)
            return toast.error("New password & re-type password not matched!")
        }

        try {
            await updateUserPassword(user?.email, changePass)
            toast.success("Password updated successfull!")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(`Error: ${error.message}`)
        }
    }


    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">
                Change password :
            </h5>
            <form onSubmit={handleChangepassword}>
                <div className="grid grid-cols-1 gap-5">
                    {
                        user?.password &&
                        <div>
                            <Label className="mb-2 block">Old password :</Label>
                            <Input
                                type="password"
                                placeholder="Old password"
                                name="oldPassword"
                                id="oldPassword"
                                onChange={handleInputChange}
                                value={changePass.oldPassword}
                                required
                            />
                        </div>
                    }
                    <div>
                        <Label className="mb-2 block">New password :</Label>
                        <Input
                            type="password"
                            placeholder="New password"
                            name="newPassword"
                            id="newPassword"
                            onChange={handleInputChange}
                            value={changePass.newPassword}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Re-type New password :
                        </Label>
                        <Input
                            type="password"
                            placeholder="Re-type New password"
                            name="reTypePass"
                            id="reTypePass"
                            onChange={handleInputChange}
                            value={changePass.reTypePass}
                            required
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button className="mt-5" type="submit">
                    {loading ? <Loader /> : "Change Password"}
                </Button>
            </form>
        </div>
    )
}

export default PasswordChange
