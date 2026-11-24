import { allItems, SITE } from "@/lib/registry";

// Serves /r/registry.json — the index of everything installable.
export const dynamic = "force-static";

export function GET() {
  const items = allItems(false).map(({ $schema, ...i }) => { void $schema; return i; });
  return Response.json(
    { $schema: "https://ui.shadcn.com/schema/registry.json", name: "aryan-tomar", homepage: SITE, items },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
