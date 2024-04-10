import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";

export default function Enrollment({ auth }: PageProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    year: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("enrollments.insert"));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div>Insert form</div>

      <form onSubmit={submit}>
        <input
          name="year"
          type="text"
          value={data.year}
          onChange={(e) => setData("year", e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </AuthenticatedLayout>
  );
}
