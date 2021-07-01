import fs from "fs";

export async function deleteFile(filename: string): Promise<void> {
  try {
    await fs.promises.stat(filename);
  } catch (e) {
    return;
  }
  await fs.promises.unlink(filename);
}
