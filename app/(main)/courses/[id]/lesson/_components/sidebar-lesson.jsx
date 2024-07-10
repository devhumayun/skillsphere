import {
    AccordionContent
} from "@/components/ui/accordion";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { SidebarLessonsItem } from "./sidebar-lesson-items";

export const SidebarLesson = ({ courseId, moduleSlug, lessons }) => {

    const allLessons = replaceMongoIdInArray(lessons).toSorted((a, b) => a.order - b.order)

    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
                {
                    allLessons?.map((lesson) => (
                        <SidebarLessonsItem
                            key={lesson.id}
                            courseId={courseId}
                            lesson={lesson}
                            moduleSlug={moduleSlug}
                        />
                    ))
                }

            </div>
        </AccordionContent>
    )
}


