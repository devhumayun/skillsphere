"use client";

import { Trash } from "lucide-react";

import { deleteModule, updateModuleStatus } from "@/app/action/module";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ModuleActions = ({ courseId, module }) => {

    const [action, setAction] = useState(null)
    const [publish, setPublishe] = useState(module?.active)
    const router = useRouter()

    const handleModuleAction = async (e) => {
        e.preventDefault()
        try {
            switch (action) {
                case "change-module-status":
                    const activeStatus = await updateModuleStatus(module?.id)
                    setPublishe(!activeStatus)
                    toast.success("Module status updated")
                    router.refresh()
                    break;
                case "delete-module":
                    if (publish) {
                        toast.info("You have to unpublished first for deleting this module")
                    } else {
                        await deleteModule(courseId, module?.id)
                        router.refresh()
                        router.push(`/dashboard/courses/${courseId}`)
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleModuleAction}>
            <div className="flex items-center gap-x-2">
                <Button onClick={() => setAction("change-module-status")} variant="outline" size="sm">
                    {publish ? "Unpublish" : "Publish"}
                </Button>

                <Button onClick={() => setAction("delete-module")} size="sm">
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
