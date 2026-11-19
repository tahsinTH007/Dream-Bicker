export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-full w-full rounded-full border-4 border-[#142B3B]/10"></div>
        <div className="absolute h-full w-full rounded-full border-4 border-t-[#E97835] animate-spin"></div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#777777]">
        লোড হচ্ছে...
      </p>
    </div>
  );
}
