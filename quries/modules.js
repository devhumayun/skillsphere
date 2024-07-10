import { replaceMongoIdInObject } from "@/lib/convertData";
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

export const getModuleBySlug = async (slug) => {
  try {
    const moduled = await Module.findOne({ slug: slug });
    return replaceMongoIdInObject(moduled);
  } catch (error) {
    throw new Error(error);
  }
};
