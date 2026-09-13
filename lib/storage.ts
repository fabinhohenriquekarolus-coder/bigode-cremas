import path from "path";

export function uploadDir(): string {
  if (process.env.UPLOAD_DIR) {
    return process.env.UPLOAD_DIR;
  }

  // In production (Railway), derive the uploads folder from DATABASE_URL so a
  // single persistent volume (mounted where the .db file lives) covers both
  // the database and uploaded photos, with no extra env var required.
  if (process.env.NODE_ENV === "production") {
    const dbUrl = process.env.DATABASE_URL || "";
    if (dbUrl.startsWith("file:")) {
      const dbDir = path.dirname(path.resolve(dbUrl.replace(/^file:/, "")));
      return path.join(dbDir, "media");
    }
  }

  return path.join(process.cwd(), "public", "uploads");
}
