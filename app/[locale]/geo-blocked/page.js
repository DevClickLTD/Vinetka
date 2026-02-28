export const metadata = {
  title: "В процес на разработка",
  description: "Сайтът е в процес на разработка",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeoBlockedPage() {
  const crossPattern = {
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, 0.1) 25%, rgba(139, 92, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.1) 25%, rgba(139, 92, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 76%, transparent 77%, transparent)
    `,
    backgroundSize: "80px 80px",
    backgroundPosition: "0 0",
  };

  const radialOverlay = {
    background:
      "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.8) 100%)",
  };

  return (
    <html lang="bg">
      <body>
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
          <div className="absolute inset-0" style={crossPattern}>
            <div className="absolute inset-0" style={radialOverlay}></div>
          </div>

          <div className="text-center px-4 z-10 relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              В процес на разработка
            </h1>
            <div className="w-32 h-1 bg-purple-500 mx-auto opacity-50"></div>
            <p className="text-gray-400 mt-8 text-lg">
              Моля използвайте <a href="https://www.avtovia.bg" className="text-purple-400 hover:text-purple-300 underline">avtovia.bg</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
