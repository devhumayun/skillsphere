import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { dbConnect } from "@/services/mongo";

export const getCategories = async () => {
  try {
    await dbConnect();
    const categories = await Category.find({}).lean();

    return replaceMongoIdInArray(categories);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategory = async (categoryId) => {
  try {
    await dbConnect();
    const category = await Category.findById(categoryId).lean();

    return replaceMongoIdInObject(category);
  } catch (error) {
    throw new Error(error);
  }
};
