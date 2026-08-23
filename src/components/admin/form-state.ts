/**
 * Shared shape for the admin form actions.
 *
 * Kept out of `actions.ts` because a "use server" file may only export async
 * functions: the idle value below is an object, and exporting it from there
 * fails the build.
 */
export type FormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const idleState: FormState = { status: "idle" };
