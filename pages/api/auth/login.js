import { getDb } from "../../../lib/db.js";
import { MESSAGE } from "./../../../constanst";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: MESSAGE.LOGIN_REQUIRED });

  const emailNormalized = String(email).trim().toLowerCase();
  const rawPassword = String(password);

  try {
    const db = getDb();

    // Thực thi SQL bằng db.execute
    const result = await db.execute(
      `SELECT id, email, password, name, address, phone, avatar, created_at, role 
      FROM users 
      WHERE LOWER(email) = LOWER(?)`,
      [emailNormalized]
    );

    const users = result.rows;

    if (!users || users.length === 0) {
      return res.status(401).json({ error: MESSAGE.LOGIN_INVALID });
    }

    const user = users[0];

    if (user.password !== rawPassword) {
      return res.status(401).json({ error: MESSAGE.LOGIN_FAILED });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      role: user.role,
      address: user.address,
      phone: user.phone,
      avatar: user.avatar,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: MESSAGE.SERVER_ERROR });
  }
}
