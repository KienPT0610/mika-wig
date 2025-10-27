import ProductCard from "./ProductCard";

import { useEffect, useState } from "react";

export default function Featured() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((j) => setProducts(j.products || []));
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((j) => setCategories(j.categories || []));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4 font-poppins">
            Sản phẩm nổi bật
          </h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full" />
        </div>
        <div className="flex gap-4 mb-8">
          {categories.slice(0, 4).map((c) => (
            <div key={c.id || c.name} className="px-4 py-2 border rounded">
              {c.name || c}
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">
              Không có sản phẩm
            </div>
          ) : (
            products
              .slice(0, 3)
              .map((p) => (
                <ProductCard
                  key={p.id}
                  title={p.name}
                  image={p.image_urls?.[0]}
                  id={p.id}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}
