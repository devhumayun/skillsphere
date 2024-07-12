// import mongoose from "mongoose";

// export const dbConnect = async () => {
//   if (mongoose.connection?.readyState >= 1) {
//     console.log("Already connected to the database.");
//     return mongoose.connection;
//   }

//   console.log("MONGO_URL:", process.env.MONGO_URL); // Log the MONGO_URL for verification

//   try {
//     console.log("Connecting to the database...");
//     const connection = await mongoose.connect(process.env.MONGO_URL);

//     console.log("Database connected successfully.");
//     return connection;
//   } catch (error) {
//     console.error("Database connection error:", error);
//     throw new Error("Database connection failed");
//   }
// };
import mongoose from "mongoose";

export const dbConnect = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("Already connected to the database.");
    return mongoose.connection;
  }

  console.log("MONGO_URL:", process.env.MONGO_URL); // Log the MONGO_URL for verification

  try {
    console.log("Connecting to the database...");
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
      socketTimeoutMS: 45000, // Socket timeout
    });

    console.log("Database connected successfully.");
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
};
