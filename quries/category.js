import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { dbConnect } from "@/services/mongo";

export const getCategories = async () => {
  await dbConnect();
  const categories = await Category.find({}).lean();

  return replaceMongoIdInArray(categories);
};
