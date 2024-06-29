import { auth } from "@/auth";
import {
  getCourseDetails,
  getCourseDetailsByInstructor,
} from "@/quries/course";
import { getAReport } from "@/quries/report";
import { getUserByEmail, getUserById } from "@/quries/user";

export const COURSES_DATA = "course";
export const ENROLLMENT = "enrollments";
export const REVIEW = "review";

const populateReviewData = async (reviews) => {
  const populatedData = await Promise.all(
    reviews?.map(async (review) => {
      const student = await getUserById(review?.user?._id);
      review["studentName"] = `${student?.firstName} ${student?.lastName}`;

      return review;
    })
  );
  return populatedData;
};

const populateEnrollmentData = async (enrollments) => {
  const popupatedData = await Promise.all(
    enrollments?.map(async (enrollment) => {
      const student = await getUserById(enrollment?.student?._id);
      const studentName = student?.name
        ? student?.name
        : `${student?.firstName} ${student?.lastName}`;
      const email = student?.email;

      // update student info
      enrollment["studentName"] = studentName;
      enrollment["email"] = email;

      // for quiz and progress
      const filter = {
        course: enrollment?.course?._id,
        student: enrollment?.student?._id,
      };
      const report = await getAReport(filter);
      enrollment["progress"] = 0;
      enrollment["quizMark"] = 0;

      if (report) {
        // get course for defineing total modules
        const course = await getCourseDetails(enrollment?.course?._id);

        // progress
        const totalModules = course.modules?.length;
        const totalCompletedModeules = report?.totalCompletedModeules?.length;
        const progress = (totalCompletedModeules / totalModules) * 100;

        if (progress) {
          enrollment["progress"] = progress;
        } else {
          enrollment["progress"] = 0;
        }

        // quiz mark
        const totalQuizes = report?.quizAssessment?.assessments;
        const quizesToken = totalQuizes?.filter((a) => a.attempted);

        const quizzes = report?.quizAssessment?.assessments;
        const quizzesTaken = quizzes?.filter((q) => q.attempted);
        const totalCorrect = quizzesTaken
          ?.map((quiz) => {
            const item = quiz.options;
            return item.filter((o) => {
              return o.isCorrect === true && o.isSelected === true;
            });
          })
          .filter((elem) => elem?.length > 0)
          .flat();
        if (totalCorrect) {
          enrollment["quizMark"] = totalCorrect?.length * 5;
        } else {
          enrollment["quizMark"] = 0;
        }
      }

      return enrollment;
    })
  );

  return popupatedData;
};

export const instructorDashboardData = async (dataType) => {
  try {
    const session = await auth();
    const instructor = await getUserByEmail(session?.user?.email);

    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    switch (dataType) {
      case COURSES_DATA:
        return data.course;
      case ENROLLMENT:
        return populateEnrollmentData(data.enrollments);

      case REVIEW:
        return populateReviewData(data.reviews);

      default:
        return data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
