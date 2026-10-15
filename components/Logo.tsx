import Image from "next/image";
import Link from "next/link";

export function Logo({ size = "md" }: { size?: "md" | "sm" }) {
  const icon = size === "md" ? 26 : 22;
  const word = size === "md" ? 13 : 11;
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Chanium home">
      <Image
        src="/assets/chanium-icon.png"
        alt=""
        width={icon}
        height={icon}
        priority={size === "md"}
        className="logo-adaptive"
        style={{ height: icon, width: icon }}
      />
      <Image
        src="/assets/chanium-wordmark.png"
        alt="Chanium"
        width={Math.round((word * 1080) / 160)}
        height={word}
        priority={size === "md"}
        className="logo-adaptive"
        style={{ height: word, width: "auto" }}
      />
    </Link>
  );
}
