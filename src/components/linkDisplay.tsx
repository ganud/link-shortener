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

export function Links({ links }: { links: Link[] }) {
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
            <TableCell>{link.alias}</TableCell>
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
