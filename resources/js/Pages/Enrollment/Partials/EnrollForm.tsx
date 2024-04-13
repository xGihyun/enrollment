import { enrollmentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

export default function EnrollForm() {
  const form = useForm<z.infer<typeof enrollmentSchema>>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      year: "",
      level: "",
      tuition_plan: "",
    },
  });

  function onSubmit(values: z.infer<typeof enrollmentSchema>) {
    console.log(values);

    let loading: number | string | undefined;

    const dismissToast = (toastId: number | string | undefined) => {
      if (!toastId) return;

      toast.dismiss(toastId);
    };

    router.post(
      route("enrollments.insert"),
      {
        ...values,
      },
      {
        onProgress: () => {
          loading = toast.loading("Inserting enrollment data...");
        },
        onSuccess: () => {
          toast.success("Successfully enrolled.");
        },
        onError: (err) => {
          console.log("IT ERRORED");
          console.log(err);
          toast.error("Failed to enroll. Please try again.");
        },
        onCancel: () => {
          dismissToast(loading);
        },
        onFinish: () => {
          dismissToast(loading);
        },
      },
    );
  }

  const gradeLevels = ["Grade 11", "Grade 12"];
  const tuitionPlans = ["a", "b"];

  return (
    <Form {...form}>
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gradeLevels.map((level) => {
                    return (
                      <SelectItem value={level} key={level}>
                        {level}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {/* <FormDescription> */}
              {/*   . */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tuition_plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tuition Plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tuitionPlans.map((plan) => {
                    return (
                      <SelectItem value={plan} key={plan}>
                        {plan}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {/* <FormDescription> */}
              {/*   . */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_receipt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
