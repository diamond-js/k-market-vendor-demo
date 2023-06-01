export function LoadingModal() {
  return (
    <div className="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-center">
      <h3 className="text-white text-2xl">Loading...</h3>
      <span className="w-20 h-20 bg-white animate-ping block rounded-full"></span>
    </div>
  );
}
