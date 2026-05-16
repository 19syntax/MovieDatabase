import { MovieCardSkeleton } from "./MovieCardSkeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}
