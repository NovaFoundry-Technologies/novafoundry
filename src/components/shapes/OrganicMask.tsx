import type { SVGProps } from "react";

export const organicImageMaskPath =
  "M32 0H488C506 0 520 14 520 32V42C520 60 534 74 552 74H948C966 74 980 88 980 106V875H520V850H32C14 850 0 836 0 818V32C0 14 14 0 32 0Z";

export function OrganicImageMask(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 980 875"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={organicImageMaskPath} fill="currentColor" />
    </svg>
  );
}

export function OrganicImageMaskDefs({
  id = "organic-image-mask",
}: {
  id?: string;
}) {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path
            d="M0.033 0H0.498C0.516 0 0.531 0.016 0.531 0.037V0.048C0.531 0.069 0.545 0.085 0.563 0.085H0.967C0.986 0.085 1 0.101 1 0.121V1H0.531V0.971H0.033C0.014 0.971 0 0.955 0 0.935V0.037C0 0.016 0.014 0 0.033 0Z"
            fill="black"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default OrganicImageMask;
