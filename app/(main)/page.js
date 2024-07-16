import { SectionTitle } from "@/components/SectionTitle";
import { buttonVariants } from "@/components/ui/button";

import CourseCategory from "@/components/CourseCategory";
import { cn } from "@/lib/utils";
import { getCategories } from "@/quries/category";
import { getCourseList } from "@/quries/course";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseCard from "./courses/_components/CourseCard";

const HomePage = async () => {
  const categories = await getCategories();
  const courses = await getCourseList();

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16 grainy">
        <div className="container">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center gap-5">
              <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium border shadow-lg w-[150px]">
                Hey, Welcome
              </span>
              <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                Learn Today, Lead Tomorrow.
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                “You don’t understand anything until you learn it more than one
                way.”
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-start">
                <Link href="" className={cn(buttonVariants({ size: "lg" }))}>
                  Explore Now
                </Link>
                <Link
                  href="/register/instructor"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" })
                  )}
                >
                  Become An Instructor
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={"/shap-author1.png"}
                alt="Author"
                height={500}
                width={500}
                priority={100}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <CourseCategory categories={categories} />
      {/* Courses */}
      <section id="courses" className="container space-y-6   md:py-12 lg:py-16">
        <div className="flex items-center justify-between">
          <SectionTitle>Courses</SectionTitle>
          <Link
            href={"/courses"}
            className=" text-sm font-medium  hover:opacity-80 flex items-center gap-1"
          >
            Browse All <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {courses?.map((course) => (
            <CourseCard key={course?._id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
};
export default HomePage;
