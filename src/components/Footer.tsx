export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">

        <h2 className="text-xl font-bold text-blue-400">
          IndieVault
        </h2>

        <p className="mt-2 text-sm text-white/60">
          Discover underground and independent animation from creators around the world.
        </p>

        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} IndieVault
        </p>

      </div>
    </footer>
  );
}