import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AddItemForm from "@/components/items/AddItemForm";

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-3xl text-cream sm:text-4xl">
          List a New Item
        </h1>
        <p className="mt-2 text-sm text-cream/60">
          Add a product to the Brewpoint marketplace. It goes live immediately.
        </p>
        <div className="mt-8">
          <AddItemForm />
        </div>
      </main>
    </ProtectedRoute>
  );
}
