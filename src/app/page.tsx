import { Links } from "./links";

export default async function Home() {
  console.log("\n\nTHIS IS ME ON THE SERVER\n\n");

  return (
    <main className="min-h-screen p-24 max-w-2xl mx-auto text-black">
      <h1 className="text-6xl font-bold mb-12">
        K-Market <small className="text-lg">Vendor</small>
      </h1>

      <h3 className="text-4xl mb-12">Register Your Business</h3>

      <Links />
    </main>
  );
}
