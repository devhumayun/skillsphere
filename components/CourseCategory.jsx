"use client"
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { SectionTitle } from "./SectionTitle";


const CourseCategory = ({ categories }) => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <section
            id="categories"
            className="container space-y-6  py-8  md:py-12 lg:py-16"
        >
            <div className="flex items-center justify-between">
                <SectionTitle>Categories</SectionTitle>

                <Link
                    href={""}
                    className=" text-sm font-medium  hover:opacity-80 flex items-center gap-1"
                >
                    Browse All <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
            <div>
                <Slider {...settings}>
                    {categories.map((category) => {
                        return (
                            <Link
                                href=""
                                key={category.id}
                                className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-all duration-500 ease-in-out"
                            >
                                <div className="flex  flex-col gap-4 items-center justify-between rounded-md p-6">
                                    <Image
                                        src={`/images/categories/${category?.thumbnail}`}
                                        alt={category.title}
                                        width={100}
                                        height={100}
                                    />
                                    <h3 className="font-bold text-[14px]">{category.title}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </Slider>
            </div>
        </section>
    )
}

export default CourseCategory
