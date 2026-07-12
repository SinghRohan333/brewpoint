export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cream/10 bg-espresso-light">
      <div className="aspect-4/3 w-full animate-pulse bg-cream/5" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-cream/10" />
        <div className="h-4 w-full animate-pulse rounded bg-cream/10" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-cream/10" />
        <div className="mt-auto flex items-center justify-between">
          <div className="h-6 w-16 animate-pulse rounded bg-cream/10" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-cream/10" />
        </div>
      </div>
    </div>
  );
}
