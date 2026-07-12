"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsSection({
  productId,
  initialCount,
}: {
  productId: string;
  initialCount: number;
}) {
  const { user, accessToken } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const data = await apiFetch<{ data: Review[] }>(
        `/products/${productId}/reviews`,
      );
      setReviews(data.data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return setError("Select a star rating");
    if (!comment.trim()) return setError("Write a comment");

    setError("");
    setSubmitting(true);
    try {
      await apiFetch(`/products/${productId}/reviews`, {
        method: "POST",
        token: accessToken || undefined,
        body: JSON.stringify({ rating, comment }),
      });
      setComment("");
      setRating(0);
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const alreadyReviewed = user && reviews.some((r) => r.userName === user.name);

  return (
    <section id="reviews" className="mt-16 scroll-mt-24">
      <h2 className="font-display text-2xl text-cream">
        Reviews {initialCount > 0 && `(${initialCount})`}
      </h2>

      {user && !alreadyReviewed && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-cream/10 bg-espresso-light p-6"
        >
          <p className="text-sm font-medium text-cream">Leave a review</p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                aria-label={`Rate ${i + 1} stars`}
              >
                <Star
                  size={22}
                  className={
                    i < rating ? "fill-gold text-gold" : "text-cream/20"
                  }
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={3}
            className="mt-3 w-full rounded-lg border border-cream/20 bg-espresso px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-espresso transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {!user && (
        <p className="mt-4 text-sm text-cream/50">
          <a href="/login" className="text-gold hover:underline">
            Log in
          </a>{" "}
          to leave a review.
        </p>
      )}

      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-sm text-cream/50">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-cream/10 pb-6 last:border-0"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-cream">
                  {review.userName}
                </p>
                <span className="text-xs text-cream/40">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "fill-gold text-gold"
                        : "text-cream/20"
                    }
                  />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-cream/50">
            No reviews yet — be the first to share your thoughts.
          </p>
        )}
      </div>
    </section>
  );
}
