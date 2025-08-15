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
          <TableRow
            key={link.id}
            onClick={() => {
              navigator.clipboard.writeText(`${url}/${link.alias}`);
              toast.success(`Copied ${url}/${link.alias} to clipboard.`);
            }}
          >
            <TableCell className="font-medium">{link.url}</TableCell>
            <TableCell>
              {url}/{link.alias}
            </TableCell>
            <TableCell>
              {link.createdAt.toLocaleDateString()}{" "}
              {link.createdAt.toLocaleTimeString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
