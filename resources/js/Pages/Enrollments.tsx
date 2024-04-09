import { Enrollment, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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

export default function Enrollments({
  auth,
  enrollments,
}: PageProps<{ enrollments: Enrollment[] }>) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Enrollments" />

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
              {enrollments.map((enrollment) => {
                return (
                  <TableRow className="first:bg-accent">
                    <TableCell className="font-medium">
                      {enrollment.year}
                    </TableCell>
                    <TableCell>{enrollment.level}</TableCell>
                    <TableCell>{enrollment.section}</TableCell>
                    <TableCell>{enrollment.tuition_plan}</TableCell>
                    <TableCell>
                      {enrollment.status === "pending" ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-green-300 hover:bg-green-400 space-x-1"
                        >
                          <IoSchool />
                          <span>Enroll</span>
                        </Button>
                      ) : (
                        <Badge
                          className="text-xs space-x-1"
                          variant="secondary"
                        >
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
    </AuthenticatedLayout>
  );
}
