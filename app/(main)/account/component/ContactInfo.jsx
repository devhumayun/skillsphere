"use client"

import { updateUserInfo } from "@/app/action/account"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

const ContactInfo = ({ user }) => {

    const [contactInfo, setContactInfo] = useState({
        phone: user?.phone || ""
    })

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setContactInfo({
            ...contactInfo,
            [field]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateUserInfo(user?.email, contactInfo)
            toast.success("Phone number updated!")
            setLoading(false)
        } catch (error) {
            toast.error(`Error: ${error.message}`)
            setLoading(false)
        }

    }

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">Phone No. :</Label>
                        <Input
                            id="number"
                            type="number"
                            name="phone"
                            placeholder="Phone :"
                            value={contactInfo?.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Website :</Label>
                        <Input
                            name="url"
                            id="url"
                            type="url"
                            placeholder="Url :"
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button className="mt-5" type="submit">
                    {loading ? <Loader /> : "Add"}
                </Button>
            </form>
        </div>
    )
}

export default ContactInfo
