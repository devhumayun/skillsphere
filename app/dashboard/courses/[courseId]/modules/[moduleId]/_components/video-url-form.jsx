"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateCourseLesson } from "@/app/action/lesson";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formattedMyTimeDuration } from "@/lib/formateTime";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Required",
  }),
  duration: z.string().min(1, {
    message: "Required",
  }),
});

export const VideoUrlForm = ({ initialData, courseId, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const [videoUrlDuration, setVideoUrlDuration] = useState({
    url: initialData?.url,
    duration: formattedMyTimeDuration(initialData.duration)
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: videoUrlDuration,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {

      const payload = {}
      payload["video_url"] = values?.url
      const duration = values?.duration

      const durationSplitted = duration.split(":")

      console.log(durationSplitted);

      if (durationSplitted.length === 3) {
        payload["duration"] = durationSplitted[0] * 3600 + durationSplitted[1] * 60 + durationSplitted[2] * 1


        setVideoUrlDuration({
          url: payload.video_url,
          duration: payload.duration
        })
        await updateCourseLesson(lessonId, payload)
        toast.success("Lesson updated");
        toggleEdit();
        router.refresh();
      } else {
        return toast.error("Duration format must be HH:MM:SS")
      }

    } catch {
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">
            {videoUrlDuration?.url}
          </p>
          <div className="mt-6">
            <VideoPlayer url={videoUrlDuration?.url} />
          </div>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* url */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Duration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '10:30:18'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
