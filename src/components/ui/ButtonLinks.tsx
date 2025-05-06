import React from "react";

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  href,
  variant = "primary",
  ...rest
}) => (
  <a className={`button-link button-link--${variant}`} href={href} {...rest}>
    {children}
  </a>
);

export default ButtonLink;
