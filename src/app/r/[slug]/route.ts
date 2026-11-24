import { allItems } from "@/lib/registry";

// Serves /r/<name>.json — one registry item per component, in the shape the shadcn CLI installs.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allItems(false).map((i) => ({ slug: `${i.name}.json` }));
}

export function GET(_: Request, { params }: { params: { slug: string } }) {
  const name = params.slug.replace(/\.json$/, "");
  const item = allItems(true).find((i) => i.name === name);
  if (!item) return new Response("Not found", { status: 404 });
  return Response.json(item, { headers: { "Access-Control-Allow-Origin": "*" } });
}
