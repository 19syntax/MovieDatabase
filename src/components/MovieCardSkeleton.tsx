export function MovieCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-96 bg-gray-200 animate-pulse"></div>

      <div className="p-4">
        <div className="h-4 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="flex justify-between animate-pulse">
        <div className="h-3 bg-gray-200 animate-pulse"></div>
        <div className="h-3 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}
