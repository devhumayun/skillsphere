import {
    AccordionContent
} from "@/components/ui/accordion";
import { SidebarLessonsItem } from "./sidebar-lesson-items";

export const SidebarLesson = () => {

    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
                <SidebarLessonsItem />
            </div>
        </AccordionContent>
    )
}


