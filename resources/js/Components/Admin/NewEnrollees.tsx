import { Badge } from "@/Components/ui/badge";

type Enrollee = {
  name: string;
  status: "new" | "old";
  avatar?: string;
};

export default function NewEnrollees({ enrollees }: { enrollees: Enrollee }) {
  return (
    <div className="divide-y">
      <div className="flex justify-between items-center py-1.5">
        <div className="flex items-center gap-2 w-full">
          <div className="w-10 h-10 rounded-full bg-neutral-500"></div>
          <div>Last, First Second, M.</div>
        </div>

        <Badge variant={"default"} className="justify-self-end">
          New
        </Badge>
      </div>
    </div>
  );
}
