import { getCourses } from "@/quries/course";


const Text = async () => {
    const courses = await getCourses()
    console.log(courses);

    return (
        <div>
            This is just for test
        </div>
    )
}

export default Text
