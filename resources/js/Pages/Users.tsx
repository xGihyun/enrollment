import { PageProps, User } from "@/types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Users({ auth, users }: PageProps<{ users: User[] }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Users" />

      {users.map((user) => {
        return <div key={user.id}>{user.first_name}</div>;
      })}
    </AuthenticatedLayout>
  );
}
