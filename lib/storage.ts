import path from "path";

export function uploadDir(): string {
  return process.env.UPLOAD_DIR
    ? process.env.UPLOAD_DIR
    : path.join(process.cwd(), "public", "uploads");
}
