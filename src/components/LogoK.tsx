import React from 'react';
// @ts-ignore
import logoUrl from '../../assets/images/Logo.png';
import logoUrlLight from '../../assets/images/Logo-Light.png';


interface LogoKProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export default function LogoK({ className, ...props }: LogoKProps) {
  return (
    <img
      src={logoUrl}
      alt="KaroTradz Logo"
      className={`${className} object-contain`}
      {...props}
    />
  );
}

export function LogoKLight({ className, ...props }: LogoKProps) {
  return (
    <img
      src={logoUrlLight}
      alt="KaroTradz Logo"
      className={`${className} object-contain`}
      {...props}
    />
  );
}
