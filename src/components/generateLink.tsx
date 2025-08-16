"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
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
import { createLink } from "@/lib/actions";
import { Session } from "next-auth";
import { updateLinkWithUser } from "@/lib/queries";

const formSchema = z.object({
  url: z.string().min(1),
  alias: z.string().min(1).max(20),
});

export default function LinkForm({ session }: { session: Session }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      alias: "",
    },
  });
  const [preview, setPreview] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href); // full current URL  of the homepage
  }, []);

  const aliasValue = form.watch("alias");
  const aliasPreview = `'horse' -> ${url}horse`;

  function generateFullLink(alias: string) {
    return url + alias;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Add the aliased link to the db from the form.
    try {
      await createLink(values);
      if (session) {
        await updateLinkWithUser(values.alias, session.user.id);
      }
      setPreview(generateFullLink(aliasValue));
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
                  placeholder="https://www.youtube.com/watch?v=ydd-Sz4iMjM"
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
                <Input placeholder={aliasPreview} type="" {...field} />
              </FormControl>
              {/* <FormDescription>Alias</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Generate Link
        </Button>
        {/* Only show a link preview if a link was successfully generated. */}
        {preview && (
          <div className="bg-muted p-2 rounded-md flex justify-between">
            <p>{preview}</p>
            <div
              className="hover:text-blue-500  transition-colors duration-300 ease-in-out"
              onClick={() => {
                toast.success("Link successfully copied!");
                navigator.clipboard.writeText(preview);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </div>
          </div>
        )}{" "}
      </form>
    </Form>
  );
}
