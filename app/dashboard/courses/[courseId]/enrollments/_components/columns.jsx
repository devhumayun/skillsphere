"use client";

import { Button } from "@/components/ui/button";
import { formateMyDate } from "@/lib/formatMyDate";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    id: "name",
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quizMark",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quiz Mark <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const progress = row.getValue("progress")
      return `${progress}%`
    }
  },
  {
    accessorKey: "enrollmentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enroll Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const enrollmentDate = row.getValue("enrollmentDate")
      return formateMyDate(enrollmentDate)
    }

  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { id } = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-4 w-8 p-0">
  //             <span className="sr-only">Open Menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <Link href={`/dashboard/courses/${id}`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               <Pencil className="h-4 w-4 mr-2" />
  //               Edit
  //             </DropdownMenuItem>
  //           </Link>
  //           <Link href={`/dashboard/courses/${id}/enrollments`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               <GraduationCap className="h-4 w-4 mr-2" />
  //               View Enrollments
  //             </DropdownMenuItem>
  //           </Link>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
