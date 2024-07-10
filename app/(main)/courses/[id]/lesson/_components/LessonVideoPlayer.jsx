"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ReactPlayer from 'react-player/youtube'

const LessonVideoPlayer = ({ courseId, lesson, moduleSlug }) => {

    const router = useRouter()
    const [hasWindow, setHaswindow] = useState(false)
    const [started, setStarted] = useState(false)
    const [ended, setEnded] = useState(false)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHaswindow(true)
        }
    }, [])

    const handleOnStart = () => {
        setStarted(true)
    }
    const handleOnEnded = () => {
        setEnded(true)
    }
    const handleOnDuration = (duration) => {
        setDuration(duration)
    }

    useEffect(() => {
        async function updateLessonwatch() {
            const res = await fetch("/api/lesson-watch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseId: courseId,
                    moduleSlug: moduleSlug,
                    lessonId: lesson.id,
                    state: "started",
                    lastTime: 0
                })
            })
            if (res.status == 200) {
                const result = await res.text()
                console.log(result);
                setStarted(true)
            }
        }
        started && updateLessonwatch()
    }, [started])

    useEffect(() => {
        async function updateLessonwatch() {
            const res = await fetch("/api/lesson-watch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseId: courseId,
                    moduleSlug: moduleSlug,
                    lessonId: lesson.id,
                    state: "completed",
                    lastTime: 0
                })
            })
            if (res.status == 200) {
                const result = await res.text()
                console.log(result);
                setEnded(false)
                router.refresh()
            }
        }
        started && updateLessonwatch()
    }, [ended])

    return (
        <>
            {
                hasWindow &&
                <ReactPlayer
                    url={lesson?.video_url}
                    controls={true}
                    width="100%"
                    height="450px"
                    onStart={handleOnStart}
                    onEnded={handleOnEnded}
                    onDuration={handleOnDuration}
                />

            }
        </>
    )
}

export default LessonVideoPlayer
