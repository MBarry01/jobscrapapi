import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial", backgroundColor: "#111", color: "#fff" }}>
      <h1>Bienvenue sur emploiscrapapi</h1>
      <p>
        ✅ Tu peux lancer l'import vers Algolia ici :
      </p>
      <p>
        <Link href="/api/jobs" style={{ color: "cyan", textDecoration: "underline" }}>
          → /api/jobs
        </Link>
      </p>
    </main>
  );
}
