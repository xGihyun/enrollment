import { SVGAttributes } from "react";

export default function ApplicationLogo({ className }: { className: string }) {
  return (
    <img src="/images/pcsLogoNew.webp" alt="PCS Logo" className={className} />
  );
}
