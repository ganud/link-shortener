import { signOut } from "@/lib/auth";
import { Session } from "next-auth";
import Link from "next/link";

export function SignOut({ session }: { session: Session }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      {/* Show currently logged in user or login prompt. */}
      {session ? (
        <p className="text-center">
          Logged in as{" "}
          <button
            type="submit"
            className="hover:text-blue-500 hover:underline font-bold"
          >
            {session.user?.username}
          </button>
        </p>
      ) : (
        <p className="text-center">
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>{" "}
          to save your links.
        </p>
      )}
    </form>
  );
}
