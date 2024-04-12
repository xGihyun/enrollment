import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Enrollment, PageProps } from "@/types";
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

export default function Dashboard({
  auth,
  academicYears,
}: PageProps<{ academicYears: any[] }>) {
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
        <EnrollmentTable academicYears={academicYears} />
      </div>
    </AuthenticatedLayout>
  );
}

function EnrollmentTable({ academicYears }: { academicYears: any[] }) {
  // const academicYears: Enrollment[] = [
  //   {
  //     id: 1,
  //     year: "2022-2023",
  //     level: "Grade 12",
  //     section: "St. Agatha",
  //     tuition_plan: "A",
  //     status: "pending",
  //     student_id: 1,
  //     enrolled_at: new Date(),
  //     payment_receipt_url: "url",
  //   },
  // ];

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
            {academicYears.map((academicYear) => {
              return (
                <TableRow className="first:bg-accent" key={academicYear.id}>
                  <TableCell className="font-medium">
                    {academicYear.year}
                  </TableCell>
                  <TableCell>{academicYear.level ?? "---"}</TableCell>
                  <TableCell>{academicYear.section ?? "---"}</TableCell>
                  <TableCell>{academicYear.tuition_plan ?? "---"}</TableCell>
                  <TableCell>
                    {academicYear.status === "open" ? (
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
