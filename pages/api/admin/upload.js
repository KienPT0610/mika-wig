import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { getDb } from '../../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload error', detail: err.message });
    const fileArr = Array.isArray(files.images) ? files.images : [files.images];
    const urls = [];
    const db = await getDb();
    for (const f of fileArr) {
      const data = fs.readFileSync(f.filepath);
      const base64 = 'data:' + f.mimetype + ';base64,' + data.toString('base64');
      // Save base64 string to DB and return it as URL
      // Optionally, you can save to product_images table here if you want to associate with a product
      urls.push(base64);
    }
    res.status(200).json({ urls });
  });
}
