import type React from "react";
import { ExternalLink } from "lucide-react";

type MemberDetailLink = {
  href: string;
  label: string;
};

type MemberDetailLeftProps = {
  image: React.ReactNode;
  name: string;
  realName?: string | null;
  profile?: string | null;
  profileClassName?: string;
  links?: MemberDetailLink[];
  children?: React.ReactNode;
};

export function MemberDetailLeft({
  image,
  name,
  realName,
  profile,
  profileClassName,
  links,
  children,
}: MemberDetailLeftProps) {
  return (
    <>
      <div className="mb-4">{image}</div>
      <h1 className="font-league mb-2">{name}</h1>
      {realName && realName !== name && (
        <p className="text-sm text-muted-foreground mb-4">
          Real name: {realName}
        </p>
      )}
      {profile && (
        <p className={`text-sm text-muted-foreground mb-4 ${profileClassName ?? ""}`}>
          {profile}
        </p>
      )}
      {children}
      {links && links.length > 0 && (
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
