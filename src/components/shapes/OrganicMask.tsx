import type { CSSProperties, ReactNode, SVGProps } from "react";

export const organicImageMaskPath =
  "M32 0H488C506 0 520 14 520 32V42C520 60 534 74 552 74H948C966 74 980 88 980 106V875H520V850H32C14 850 0 836 0 818V32C0 14 14 0 32 0Z";

export const organicVideoMaskPath =
  "M32 0H488C506 0 520 14 520 32V52C520 70 534 84 552 84H948C966 84 980 98 980 116V703C980 721 966 735 948 735H552C534 735 520 721 520 703V681C520 663 506 649 488 649H32C14 649 0 635 0 617V32C0 14 14 0 32 0Z";

type OrganicImageMaskProps = SVGProps<SVGSVGElement> & {
  children?: ReactNode;
  maskId?: string;
};

type OrganicMaskWrapperProps = OrganicImageMaskProps & {
  defs: ReactNode;
};

function OrganicMaskWrapper({
  children,
  className,
  defs,
  maskId,
  style,
}: OrganicMaskWrapperProps) {
  return (
    <div
      className={className}
      style={
        {
          clipPath: `url(#${maskId})`,
          ...style,
        } as CSSProperties
      }
    >
      {defs}
      {children}
    </div>
  );
}

export function OrganicImageMask({
  children,
  className,
  maskId = "organic-image-mask",
  style,
  ...props
}: OrganicImageMaskProps) {
  if (children) {
    return (
      <OrganicMaskWrapper
        className={className}
        defs={<OrganicImageMaskDefs id={maskId} />}
        maskId={maskId}
        style={style}
      >
        {children}
      </OrganicMaskWrapper>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={style}
      viewBox="0 0 980 875"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={organicImageMaskPath} fill="currentColor" />
    </svg>
  );
}

export function OrganicVideoMask({
  children,
  className,
  maskId = "organic-video-mask",
  style,
  ...props
}: OrganicImageMaskProps) {
  if (children) {
    return (
      <OrganicMaskWrapper
        className={className}
        defs={<OrganicVideoMaskDefs id={maskId} />}
        maskId={maskId}
        style={style}
      >
        {children}
      </OrganicMaskWrapper>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={style}
      viewBox="0 0 980 735"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={organicVideoMaskPath} fill="currentColor" />
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

export function OrganicVideoMaskDefs({
  id = "organic-video-mask",
}: {
  id?: string;
}) {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path
            d="M0.033 0H0.498C0.516 0 0.531 0.019 0.531 0.044V0.071C0.531 0.095 0.545 0.114 0.563 0.114H0.967C0.986 0.114 1 0.133 1 0.158V0.956C1 0.981 0.986 1 0.967 1H0.563C0.545 1 0.531 0.981 0.531 0.956V0.927C0.531 0.902 0.516 0.883 0.498 0.883H0.033C0.014 0.883 0 0.864 0 0.839V0.044C0 0.019 0.014 0 0.033 0Z"
            fill="black"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default OrganicImageMask;

