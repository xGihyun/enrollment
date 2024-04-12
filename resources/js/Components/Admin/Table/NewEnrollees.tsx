import { Badge } from "@/Components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

export default function NewEnrollees() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      {/* <TableHeader> */}
      {/*   <TableRow> */}
      {/*     <TableHead>Name</TableHead> */}
      {/*     <TableHead>Status</TableHead> */}
      {/*   </TableRow> */}
      {/* </TableHeader> */}
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <div className="w-10 h-10 rounded-full bg-neutral-500"></div>
          </TableCell>
          <TableCell className="font-medium">
            Nuez, Giordan Matthew R.
          </TableCell>
          <TableCell>
            <Badge>New</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="w-10 h-10 rounded-full bg-neutral-500"></div>
          </TableCell>
          <TableCell className="font-medium">Nuez, adhsa</TableCell>
          <TableCell>
            <Badge variant={"outline"}>Old</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
