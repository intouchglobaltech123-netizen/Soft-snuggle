/**
 * Runs once when the server starts, before it handles any request.
 *
 * Without this, the first page that reads from the embedded database fails with
 * "ArrayBuffer is not detachable and could not be cloned", and every request
 * after it works. The embedded database is a WebAssembly build of Postgres, and
 * starting it halfway through rendering breaks the response already streaming.
 * Starting it here, while nothing is streaming, means the first visitor gets a
 * page rather than a 500.
 *
 * Only the embedded database is touched: a real Postgres connection has no
 * WebAssembly to start, and importing node-postgres here would pull it into a
 * bundle that cannot reach the filesystem.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.DATABASE_URL) return;
  try {
    const { getPglite } = await import("./lib/pglite");
    await getPglite();
  } catch (err) {
    // Not fatal: the first request opens it instead, as it did before.
    console.error("database warm-up failed", err);
  }
}
