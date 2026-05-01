export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lpn = searchParams.get("Lpn");
  const countryCode = searchParams.get("CountryCode") ?? "BG";

  if (!lpn) {
    return Response.json({ error: "Lpn is required" }, { status: 400 });
  }

  try {
    const upstream = `https://service.vinetka.bg/api/Vinetka/validate?Lpn=${encodeURIComponent(lpn)}&CountryCode=${encodeURIComponent(countryCode)}`;

    const response = await fetch(upstream, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Upstream service unavailable" }, { status: 502 });
  }
}
