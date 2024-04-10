import { AcademicYear } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/Components/ui/badge";
import { MdUpcoming } from "react-icons/md";
import { BsDoorOpenFill } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";

import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { CalendarIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicYearSchema } from "@/schemas";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";

export const columns: ColumnDef<AcademicYear>[] = [
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "start_at",
    header: "Start",
  },
  {
    accessorKey: "end_at",
    header: "End",
  },
  {
    accessorKey: "student_count",
    header: "Student Count",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = capitalizeFirstLetter(row.getValue("status"));

      let color = "";
      let icon: JSX.Element;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "default";

      switch (row.getValue("status")) {
        case "upcoming":
          color = "bg-amber-500 hover:bg-amber-500";
          icon = <MdUpcoming />;
          variant = "secondary";
          break;
        case "open":
          color = "bg-green-600 hover:bg-green-600";
          icon = <BsDoorOpenFill />;
          break;
        case "ongoing":
          color = "bg-yellow-500 hover:bg-yellow-500";
          icon = <RxLapTimer />;
          variant = "secondary";
          break;
        default:
          icon = <IoMdCheckmark />;
      }

      return (
        <Badge className={`text-xs space-x-1 ${color}`} variant={variant}>
          {icon}
          <span>{status}</span>
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const academicYear = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem className="p-0">
                <DialogTrigger className="flex gap-1 items-center w-full py-1.5 px-2">
                  <BiSolidEdit />
                  <span>Edit</span>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditDialogForm data={academicYear} />
        </Dialog>
      );
    },
  },
];

function EditDialogForm({ data }: { data: AcademicYear }) {
  const form = useForm<z.infer<typeof academicYearSchema>>({
    resolver: zodResolver(academicYearSchema),
    defaultValues: {
      year: data.year,
      start_at: new Date(data.start_at),
      end_at: new Date(data.end_at),
      status: data.status,
    },
  });

  function onSubmit(values: z.infer<typeof academicYearSchema>) {
    const start_at = format(values.start_at, "yyyy-MM-dd");
    const end_at = format(values.end_at, "yyyy-MM-dd");

    let loadingToastId: number | string | undefined;

    router.patch(
      "/academic-years",
      {
        ...values,
        start_at,
        end_at,
        id: data.id,
      },
      {
        onProgress: () => {
          loadingToastId = toast.loading("Editing academic year...");
        },
        onSuccess: () => {
          if (loadingToastId) {
            toast.dismiss(loadingToastId);
          }
          toast.success("Successfully modified academic year.");
        },
        onError: () => {
          toast.error("Failed to update academic year.");
        },
      },
    );
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new academic year</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="20XX-20XX" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_at"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Start of the school year.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_at"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>End of the school year.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="finished">Finished</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The academic year's current status.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
