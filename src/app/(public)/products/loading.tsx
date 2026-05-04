export default function Loading() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto animate-pulse">
      <div className="h-12 w-64 bg-emerald-100 mx-auto mb-16 rounded-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-2 border-emerald-50 p-8 rounded-2xl h-64 bg-emerald-50"></div>
        ))}
      </div>
    </div>
  );
}
