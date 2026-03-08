import Image from 'next/image';

import { Link } from '@/core/i18n/navigation';
import { Brand as BrandType } from '@/shared/types/blocks/common';

export function BrandLogo({
  brand,
  showTitle = true,
  logoClassName,
}: {
  brand: BrandType;
  showTitle?: boolean;
  logoClassName?: string;
}) {
  return (
    <Link
      href={brand.url || ''}
      target={brand.target || '_self'}
      className={`inline-flex items-center space-x-3 self-center ${brand.className}`}
    >
      {brand.logo && (
        <Image
          src={brand.logo.src}
          alt={brand.logo.alt || brand.title || 'Site logo'}
          width={brand.logo.width || 128}
          height={brand.logo.height || 64}
          className={
            logoClassName || brand.logo.className || 'h-8 w-auto rounded-lg'
          }
          unoptimized={brand.logo.src.startsWith('http')}
        />
      )}
      {showTitle && brand.title && (
        <span className="text-lg font-medium">{brand.title}</span>
      )}
    </Link>
  );
}
