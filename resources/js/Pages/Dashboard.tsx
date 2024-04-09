import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="py-12 w-full">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden border-gray-200 border sm:rounded-lg">
            <div className="p-6">
              <p className="font-medium">You're not enrolled.</p>
              <p>
                A journey revolving Catholic faith awaits! Enroll for school
                year (insert year) now.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <EnrollmentTable />
      </div>
    </AuthenticatedLayout>
  );
}

import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { IoSchool } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

function EnrollmentTable() {
  const academicYears = [
    {
      year: "2022 - 2023",
      level: "Grade 12",
      section: "St. Agatha",
      tuitionPlan: "Plan A",
      enrollmentStatus: "pending",
    },
    {
      year: "2021 - 2022",
      level: "Grade 11",
      section: "St. Barbara",
      tuitionPlan: "Plan B",
      enrollmentStatus: "done",
    },
  ];

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Academic Years</CardTitle>
        <CardDescription>
          Your previously enrolled academic years.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Tuition Plan</TableHead>
              <TableHead>Enrollment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {academicYears.map((data) => {
              return (
                <TableRow className="first:bg-accent">
                  <TableCell className="font-medium">{data.year}</TableCell>
                  <TableCell>{data.level}</TableCell>
                  <TableCell>{data.section}</TableCell>
                  <TableCell>{data.tuitionPlan}</TableCell>
                  <TableCell>
                    {data.enrollmentStatus === "pending" ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-green-300 hover:bg-green-400 space-x-1"
                      >
                        <IoSchool />
                        <span>Enroll</span>
                      </Button>
                    ) : (
                      <Badge className="text-xs space-x-1" variant="secondary">
                        <IoMdCheckmark />
                        <span>Done</span>
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
