import { db } from "@/lib/db";
import { notes } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { addNote } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const all = await db.select().from(notes).orderBy(desc(notes.createdAt));

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 600 }}>
      <h1>My NAS app</h1>

      <form action={addNote} style={{ display: "flex", gap: 8, margin: "20px 0" }}>
        <input
          name="content"
          placeholder="Write a note..."
          style={{ flex: 1, padding: 8 }}
          required
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add
        </button>
      </form>

      <ul>
        {all.map((n) => (
          <li key={n.id}>
            {n.content}{" "}
            <small style={{ color: "#888" }}>
              {n.createdAt.toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
      {all.length === 0 && <p style={{ color: "#888" }}>No notes yet.</p>}
    </main>
  );
}
