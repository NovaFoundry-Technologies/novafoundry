const stripes = [
  "h-[22rem]",
  "h-[17rem]",
  "h-[25rem]",
  "h-[19rem]",
  "h-[14rem]",
  "h-[21rem]",
  "h-[12rem]",
  "h-[16rem]",
  "h-[23rem]",
  "h-[18rem]",
  "h-[13rem]",
  "h-[20rem]",
  "h-[15rem]",
  "h-[24rem]",
  "h-[17rem]",
];

export default function Wave() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-[68vh] bg-gradient-to-r from-amber-200/75 via-fuchsia-200/55 via-45% to-cyan-100/80 [mask-image:linear-gradient(to_bottom,black_0%,black_28%,rgba(0,0,0,.45)_58%,transparent_100%)]" />

      <div className="absolute inset-x-0 top-0 flex h-[28rem] overflow-hidden opacity-65 blur-[.4px] [mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,.78)_58%,transparent_100%)]">
        {stripes.map((height, i) => (
          <div
            key={height + i}
            className={`${height} flex-1 border-r border-white/35 bg-gradient-to-b ${
              i % 3 === 0
                ? "from-amber-300/55 via-pink-300/35 to-transparent"
                : i % 3 === 1
                  ? "from-fuchsia-300/45 via-violet-300/35 to-transparent"
                  : "from-cyan-200/55 via-blue-200/35 to-transparent"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b from-white/0 via-white/45 to-white" />
    </div>
  );
}
