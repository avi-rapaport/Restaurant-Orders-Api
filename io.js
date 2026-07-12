import fs from "fs/promises";

export async function readData(filePath) {
  const data = await fs.readFile(filePath, "utf8");
  if (!data.trim()) return [];
  return JSON.parse(data);
}

export async function saveData(filePath, content) {
  const data = JSON.stringify(content, null, 2);
  await fs.writeFile(filePath, data);
}
