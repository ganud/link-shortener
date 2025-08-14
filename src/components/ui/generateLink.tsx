"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLink } from "@/actions/actions";

const formSchema = z.object({
  url: z.string().min(1),
  alias: z.string().min(1).max(20),
});

export default function LinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      alias: "",
    },
  });

  const aliasValue = form.watch("alias");
  const preview = "https://tachyon.pages.dev/" + aliasValue;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createLink(values);
      toast.success("Link Created");
      form.reset({});
    } catch (error) {
      toast.error("Failed to generate link.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  type=""
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the link to be shortened.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input
                  placeholder="'horse' -> https://tachlink.pages.dev/horse"
                  type=""
                  {...field}
                />
              </FormControl>
              <FormDescription>Alias</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Link</Button>
        <div className="bg-muted p-2  rounded-md">Link preview: {preview}</div>
      </form>
    </Form>
  );
}
