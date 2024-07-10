"use client"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { useSearchParams } from "next/navigation";
import { SidebarLesson } from "./sidebar-lesson";
export const ModulesSidebar = ({ courseId, modules }) => {

    const searchParams = useSearchParams()

    const allModules = replaceMongoIdInArray(modules).toSorted((a, b) => a.order - b.order)

    const query = searchParams.get("name")

    const expandedModule = allModules?.map((module) => {
        const matchedLesson = module?.lessonIds.find((lesson) => lesson.slug === query);
        return matchedLesson ? module.id : undefined;
    }).filter(Boolean); // for removing any undefined values

    const expandedModuleId = expandedModule[0] ?? allModules[0].id;

    return (
        <Accordion
            defaultValue={expandedModuleId}
            type="single"
            collapsible
            className="w-full px-6"
        >
            {
                allModules?.map((module) => (
                    <AccordionItem key={module.id} className="border-0" value={module.id}>
                        <AccordionTrigger> {module.title}</AccordionTrigger>
                        <SidebarLesson courseId={courseId} moduleSlug={module?.slug} lessons={module?.lessonIds} />
                    </AccordionItem>
                ))
            }

        </Accordion>
    )
}


