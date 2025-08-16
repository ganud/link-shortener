"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "../../generated/prisma";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteLink } from "@/lib/queries";
export function Links({ links }: { links: Link[] }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href.slice(0, -6)); // root url of this page
  }, []);

  return (
    <Table>
      <TableCaption>View your recent links.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Link</TableHead>
          <TableHead>Alias</TableHead>
          <TableHead>Date Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="font-medium">{link.url}</TableCell>
            <TableCell
              className="hover:text-blue-500 hover:underline"
              onClick={() => {
                navigator.clipboard.writeText(`${url}/${link.alias}`);
                toast.success(`Copied ${url}/${link.alias} to clipboard.`);
              }}
            >
              {url}/{link.alias}
            </TableCell>
            <TableCell>
              {link.createdAt.toLocaleDateString()}{" "}
              {link.createdAt.toLocaleTimeString()}
            </TableCell>
            <TableCell>
              <button className="hover:bg-ring rounded-full transition-colors duration-200 ease-in-out p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  onClick={async () => {
                    await deleteLink(link.alias);
                    toast.success(`Link ${url}/${link.alias} deleted`);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
