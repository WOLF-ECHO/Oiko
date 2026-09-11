import { redirect } from "next/navigation";

interface SharePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShareConfigPage({
  params,
  searchParams,
}: SharePageProps) {
  const { id } = await params;
  const search = await searchParams;

  const query = new URLSearchParams();
  query.set("cfg", id);

  if (search.payload && typeof search.payload === "string") {
    query.set("payload", search.payload);
  }
  if (search.model && typeof search.model === "string") {
    query.set("model", search.model);
  }

  redirect("/configurateur?" + query.toString());
}
