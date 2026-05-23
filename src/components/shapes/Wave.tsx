import StripeSweep from "../animations/StripeSweep";

const stripes = [
  { height: "h-[30rem]", width: 16, color: "rgba(244, 114, 22, .56)" },
  { height: "h-[27rem]", width: 14, color: "rgba(236, 72, 153, .52)" },
  { height: "h-[24rem]", width: 12, color: "rgba(217, 70, 239, .48)" },
  { height: "h-[21rem]", width: 10, color: "rgba(192, 132, 252, .46)" },
  { height: "h-[18rem]", width: 8, color: "rgba(168, 85, 247, .44)" },
  { height: "h-[15rem]", width: 6, color: "rgba(139, 92, 246, .42)" },
  { height: "h-[12rem]", width: 4, color: "rgba(99, 102, 241, .4)" },
  { height: "h-[10rem]", width: 3, color: "rgba(79, 70, 229, .38)" },
  { height: "h-[12rem]", width: 4, color: "rgba(59, 130, 246, .4)" },
  { height: "h-[15rem]", width: 6, color: "rgba(37, 99, 235, .42)" },
  { height: "h-[18rem]", width: 8, color: "rgba(14, 165, 233, .44)" },
  { height: "h-[21rem]", width: 10, color: "rgba(6, 182, 212, .46)" },
  { height: "h-[24rem]", width: 12, color: "rgba(34, 211, 238, .48)" },
  { height: "h-[27rem]", width: 14, color: "rgba(103, 232, 249, .52)" },
  { height: "h-[30rem]", width: 16, color: "rgba(165, 243, 252, .56)" },
];

export default function Wave() {
  const middleStripe = Math.floor(stripes.length / 2);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-[68vh] bg-gradient-to-r from-pink-200/75 via-purple-200/55 via-55% to-cyan-100/80 [mask-image:linear-gradient(to_bottom,black_0%,black_28%,rgba(0,0,0,.45)_58%,transparent_100%)]" />

      <div className="absolute inset-x-0 top-0 flex h-[28rem] overflow-hidden opacity-65 blur-[.4px] [mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,.78)_58%,transparent_100%)]">
        {stripes.map(({ height, width, color }, i) => (
          <div
            key={height + i}
            style={{
              flex: `${width} 1 0`,
              backgroundImage: `
                linear-gradient(to bottom, ${color}, transparent),
                linear-gradient(to ${i <= middleStripe ? "right" : "left"}, ${color}, transparent)
              `,
              backgroundBlendMode: "multiply",
            }}
            className={`${height} border-r border-white/35`}
          />
        ))}
        <StripeSweep />
      </div>

      <div className="absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b from-white/0 via-white/45 to-white" />
    </div>
  );
}
