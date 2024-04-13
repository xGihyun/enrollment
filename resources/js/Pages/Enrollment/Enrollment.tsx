import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EnrollForm from "./Partials/EnrollForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

export default function Enrollment({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 flex w-full gap-2 h-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Enrollment Form</CardTitle>
            <CardDescription>
              Please fill up the necessary details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnrollForm />
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
