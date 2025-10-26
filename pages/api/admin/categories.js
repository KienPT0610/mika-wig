import { getDb } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const db = await getDb();
    // lay danh sach danh muc
    if (req.method === "GET") {
      const result = await db.execute(
        "SELECT id, name, description FROM categories ORDER BY id"
      );
      res.status(200).json({ categories: result.rows });
    }

    // them danh muc
    else if (req.method === "POST") {
      const { name, description } = req.body;
      if (!name)
        return res.status(400).json({ error: "Thiếu tên danh mục" });
      const result = await db.execute(
        "INSERT INTO categories (name, description) VALUES (?, ?)",
        [name, description]
      );
      res.status(201).json({ category: { id: result.insertId, name, description } });
    }

    // xoa danh muc
    else if (req.method === "DELETE") {
      const { id } = req.body;
      const result = await db.execute(
        "DELETE FROM categories WHERE id = ?",
        [id]
      );
      res.status(204).json({ id });
    }

    // cap nhat danh muc
    else if (req.method === "PUT") {
      const { id, name, description } = req.body;
      if (!name)
        return res.status(400).json({ error: "Thiếu dữ liệu" });
      const result = await db.execute(
        "UPDATE categories SET name = ?, description = ? WHERE id = ?",
        [name, description, id]
      );
      res.status(200).json({ category: { id, name, description } });
    }
  } catch (e) {
    res.status(500).json({ error: "DB error", detail: e.message });
  }
}
