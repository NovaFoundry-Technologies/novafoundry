export default function VerticalStripeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-zinc-950">

      <div className="flex h-full items-center justify-center gap-24">

        {/* Plain */}
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`
                w-24 h-[500px]
                rounded-xl
                opacity-80
                blur-[1px]
                shadow-[0_0_50px_rgba(139,92,246,.4)]
                bg-gradient-to-b
                ${i % 2 === 0
                  ? "from-pink-500 via-purple-500 to-cyan-400"
                  : "from-orange-500 via-red-500 to-purple-600 translate-y-10"
                }
              `}
            />
          ))}
        </div>

        {/* Trapezium */}
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                clipPath:
                  "polygon(25% 0%,100% 0%,75% 100%,0% 100%)",
              }}
              className={`
                w-24 h-[500px]
                opacity-80
                blur-[1px]
                shadow-[0_0_50px_rgba(59,130,246,.4)]
                bg-gradient-to-b
                ${i % 2 === 0
                  ? "from-fuchsia-500 via-violet-500 to-blue-500"
                  : "from-amber-400 via-pink-500 to-indigo-600 translate-y-10"
                }
              `}
            />
          ))}
        </div>

      </div>

    </div>
  );
}