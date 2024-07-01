import { Module } from "@/models/module-models";
import { dbConnect } from "@/services/mongo";

export const created = async (moduleData) => {
  try {
    await dbConnect();

    const existingModule = await Module.findOne({ slug: moduleData.slug });
    if (existingModule) {
      throw "This module already exists";
    }
    const newModule = await Module.create(moduleData);

    return JSON.parse(JSON.stringify(newModule));
  } catch (error) {
    throw new Error(error);
  }
};
