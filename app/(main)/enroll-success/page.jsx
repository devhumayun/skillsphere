import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/quries/course";
import { sendEmails } from "@/quries/emails";
import { enrollInCourse } from "@/quries/enrollments";
import { getUserByEmail } from "@/quries/user";
import { CircleCheck, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {

  if (!session_id) {
    throw new Error("Invalid session id. Session id must start with cs_")
  }

  const userSession = await auth()
  if (!userSession?.user?.email) {
    redirect("/login")
  }
  const loggedInUser = await getUserByEmail(userSession?.user?.email)

  const course = await getCourseDetails(courseId)
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"]
  })

  const paymentIntent = checkoutSession?.payment_intent
  const paymentStatus = paymentIntent?.status


  // customer info
  const customerName = loggedInUser?.firstName ? `${loggedInUser?.firstName} ${loggedInUser?.lastName}` : loggedInUser?.name
  const customerEmail = loggedInUser?.email
  const prooductName = course?.title

  // instructor info
  const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
  const instructorEmail = course?.instructor?.email;

  const loggedInUserId = loggedInUser?.id ? loggedInUser?.id : loggedInUser?._id

  if (paymentStatus === "succeeded") {

    // Save enrollment in DB
    const enrolled = await enrollInCourse(course?.id, loggedInUserId, "stripe")
    // email sending to customer, instructor
    const emailInfo = [
      {
        to: customerEmail,
        subject: `Enrollment Success for ${prooductName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${prooductName}`,
      },
      {
        to: customerEmail,
        subject: `New enrollment for ${prooductName}`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${prooductName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      }
    ]

    const emailSentResponse = await sendEmails(emailInfo)
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      {
        paymentStatus === "succeeded" ? (
          <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-[#35D8A3]" />
            <div className="flex flex-col gap-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl">
                Hi, {loggedInUser?.name} Congratulations!
              </h1>
              <span className="text-xl">You have successfully enrolled in <strong>{course?.title}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild size="sm">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
            <LoaderIcon className="w-32 h-32 bg-success rounded-full p-0 text-[#35D8A3]" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              You Enrollment was Processing. Wait sometimes!
            </h1>
          </div>
        )
      }
    </div >
  );
};
export default Success;
