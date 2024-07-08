import { Accordion } from "@/components/ui/accordion"
import { TabsContent } from "@/components/ui/tabs"
import { formattedMyTimeDuration } from "@/lib/formateTime"
import { BookCheck, Clock10 } from "lucide-react"
import CourseModulesList from "./module/CourseModulesList"

const CourseCurriculum = ({ course }) => {

    const totalCourseDuration = course?.modules?.map((item) => {
        return item.lessonIds?.reduce((ace, obj) => {
            return ace + obj.duration
        }, 0)
    }).reduce((acc, obj) => {
        return acc + obj
    }, 0)

    return (
        <TabsContent value="curriculum">
            {/* each tab content can be independent component */}
            <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {course?.modules?.length} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    {formattedMyTimeDuration(totalCourseDuration)}
                </span>
                {/* <span className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4" />4 Live Class
                </span> */}
            </div>

            {/* contents */}
            <Accordion
                defaultValue={["item-1", "item-2", "item-3"]}
                type="multiple"
                // collapsible
                className="w-full"
            >
                {
                    course?.modules &&
                    course.modules.map((module) => (
                        <CourseModulesList key={module._id} module={module} />
                    ))
                }
            </Accordion>
            {/* contents end */}
        </TabsContent>
    )
}

export default CourseCurriculum
