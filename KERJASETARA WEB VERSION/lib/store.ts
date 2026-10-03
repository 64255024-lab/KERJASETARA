import { cookies } from "next/headers";

export const APPS_COOKIE = "ks_apps";
export const SAVED_COOKIE = "ks_saved";

async function readList(name: string): Promise<string[]> {
  return (await cookies()).get(name)?.value.split(",").filter(Boolean) ?? [];
}

async function writeList(name: string, ids: string[]): Promise<void> {
  (await cookies()).set(name, ids.join(","), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getApplications(): Promise<string[]> {
  return readList(APPS_COOKIE);
}

export async function addApplication(id: string): Promise<void> {
  const cur = await readList(APPS_COOKIE);
  if (!cur.includes(id)) await writeList(APPS_COOKIE, [...cur, id]);
}

export async function getSaved(): Promise<string[]> {
  return readList(SAVED_COOKIE);
}

export async function addSaved(id: string): Promise<void> {
  const cur = await readList(SAVED_COOKIE);
  if (!cur.includes(id)) await writeList(SAVED_COOKIE, [...cur, id]);
}
