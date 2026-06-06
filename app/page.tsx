import { db } from '@/lib/db';
import { notes } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { addNote } from './actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const all = await db.select().from(notes).orderBy(desc(notes.createdAt));

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">My NAS app</h1>

      <form action={addNote} className="mt-6 flex gap-2">
        <input
          name="content"
          placeholder="Write a note..."
          required
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-neutral-900 px-4 py-2 font-medium text-white transition hover:bg-neutral-700"
        >
          Add
        </button>
      </form>

      <ul className="mt-8 space-y-2">
        {all.map((n) => (
          <li
            key={n.id}
            className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3"
          >
            <span>{n.content}</span>
            <small className="text-neutral-400">
              {n.createdAt.toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      {all.length === 0 && (
        <p className="mt-8 text-neutral-400">No notes yet.</p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          className="rounded-lg bg-neutral-900 px-4 py-2 font-medium text-white transition hover:bg-neutral-700"
        >
          Hola
        </button>
      </div>
    </main>
  );
}
