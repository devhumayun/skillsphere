import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/models/assessment-model";
import { Module } from "@/models/module-models";
import { Report } from "@/models/report-model";
import mongoose from "mongoose";
import { getCourseDetails } from "./course";

export const getAReport = async (filter) => {
  try {
    await dbConnect();
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();

    return replaceMongoIdInObject(report);
  } catch (error) {
    throw new Error(error);
  }
};

export const createAReport = async (data) => {
  try {
    await dbConnect();
    let report = await Report.findOne({
      course: data.courseId,
      student: data.userId,
    });
    if (!report) {
      report = await Report.create({
        course: data.courseId,
        student: data.userId,
      });
    }

    const lessonFound = report.totalCompletedLessons.find(
      (lessonId) => lessonId.toString() === data.lessonId
    );

    if (!lessonFound) {
      report.totalCompletedLessons.push(
        new mongoose.Types.ObjectId(data.lessonId)
      );
    }

    const moduled = await Module.findById(data.moduleId);
    const totalLessonIdsInAModule = moduled.lessonIds;
    const completedLessons = report.totalCompletedLessons;

    const isCompletedModule = totalLessonIdsInAModule.every((lessonId) =>
      completedLessons.includes(lessonId)
    );

    if (isCompletedModule) {
      const moduleFound = report.totalCompletedModeules.find(
        (module) => module.toString() === data.moduleId
      );

      if (!moduleFound) {
        report.totalCompletedModeules.push(
          new mongoose.Types.ObjectId(data.moduleId)
        );
      }
    }

    const course = await getCourseDetails(data.courseId);

    const courseModules = course?.modules;
    const courseModuleCount = courseModules.length ?? 0;

    const competedModules = report?.totalCompletedModeules;
    const completedModuleCount = competedModules?.length ?? 0;

    if (
      completedModuleCount >= 1 &&
      completedModuleCount === courseModuleCount
    ) {
      report.completed_at = Date.now();
      report.courseComplete = true;
    }

    report?.save();
  } catch (error) {
    throw new Error(error);
  }
};
