"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const categories = [
  { value: "beans", label: "Coffee Beans" },
  { value: "equipment", label: "Equipment" },
  { value: "accessories", label: "Accessories" },
];

const roastLevels = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
];

export default function AddItemForm() {
  const { accessToken } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("beans");
  const [origin, setOrigin] = useState("");
  const [roastLevel, setRoastLevel] = useState("medium");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateImage = (index: number, value: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  };
  const addImageField = () =>
    images.length < 4 && setImages((prev) => [...prev, ""]);
  const removeImageField = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!shortDescription.trim()) return "Short description is required";
    if (!fullDescription.trim()) return "Full description is required";
    if (!price || Number(price) <= 0) return "Enter a valid price";
    if (stock && Number(stock) < 0) return "Stock cannot be negative";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError("");
    setSubmitting(true);
    try {
      const data = await apiFetch<{ data: { _id: string } }>("/products", {
        method: "POST",
        token: accessToken || undefined,
        body: JSON.stringify({
          title,
          shortDescription,
          fullDescription,
          price: Number(price),
          category,
          origin: origin || undefined,
          roastLevel: category === "beans" ? roastLevel : undefined,
          stock: stock ? Number(stock) : 0,
          images: images.filter((img) => img.trim() !== ""),
        }),
      });
      router.push(`/products/${data.data._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-cream/20 bg-espresso-light px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <label className="text-sm text-cream/70">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Ethiopian Yirgacheffe"
          className={`mt-1 ${inputClass}`}
        />
      </div>

      <div>
        <label className="text-sm text-cream/70">Short Description</label>
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="One line summary shown on cards"
          className={`mt-1 ${inputClass}`}
        />
      </div>

      <div>
        <label className="text-sm text-cream/70">Full Description</label>
        <textarea
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          placeholder="Detailed description shown on the product page"
          rows={4}
          className={`mt-1 ${inputClass}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-cream/70">Price ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="18.50"
            className={`mt-1 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-sm text-cream/70">Stock</label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="40"
            className={`mt-1 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-cream/70">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`mt-1 ${inputClass}`}
          >
            {categories.map((c) => (
              <option
                key={c.value}
                value={c.value}
                className="bg-espresso-light"
              >
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-cream/70">Origin / Location</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. Ethiopia or Japan"
            className={`mt-1 ${inputClass}`}
          />
        </div>
      </div>

      {category === "beans" && (
        <div>
          <label className="text-sm text-cream/70">Roast Level</label>
          <select
            value={roastLevel}
            onChange={(e) => setRoastLevel(e.target.value)}
            className={`mt-1 ${inputClass}`}
          >
            {roastLevels.map((r) => (
              <option
                key={r.value}
                value={r.value}
                className="bg-espresso-light"
              >
                {r.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="text-sm text-cream/70">Image URLs (optional)</label>
        <div className="mt-1 space-y-2">
          {images.map((img, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="url"
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(i)}
                  className="shrink-0 rounded-lg border border-cream/20 px-3 text-cream/50 hover:border-red-400 hover:text-red-400"
                  aria-label="Remove image field"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          {images.length < 4 && (
            <button
              type="button"
              onClick={addImageField}
              className="flex items-center gap-1 text-sm text-gold hover:underline"
            >
              <Plus size={14} />
              Add another image
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Adding..." : "Submit"}
      </button>
    </form>
  );
}
