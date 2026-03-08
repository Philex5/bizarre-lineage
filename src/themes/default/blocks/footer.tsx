import { officialLinks } from '@/content-data/site';

import { Link } from '@/core/i18n/navigation';
import {
  BrandLogo,
  BuiltWith,
  Copyright,
  LocaleSelector,
  ThemeToggler,
} from '@/shared/blocks/common';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { NavItem } from '@/shared/types/blocks/common';
import { Footer as FooterType } from '@/shared/types/blocks/landing';

export function Footer({ footer }: { footer: FooterType }) {
  return (
    <footer
      id={footer.id}
      className={`border-border/70 relative overflow-x-hidden border-t bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-background)_96%,white)_0%,var(--color-secondary)_100%)] py-8 sm:py-8 dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-background)_94%,black)_0%,color-mix(in_oklab,var(--color-card)_92%,black)_100%)] ${footer.className || ''}`}
      // overflow-x-hidden防止-footer-撑出水平滚动条
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)] opacity-60" />
      <div className="container space-y-8 overflow-x-hidden">
        <div className="grid min-w-0 gap-12 md:grid-cols-5">
          <div className="min-w-0 md:col-span-2">
            <div className="grid items-center gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6">
              {footer.brand ? (
                <div className="flex h-full items-center">
                  <BrandLogo
                    brand={footer.brand}
                    showTitle={false}
                    logoClassName="h-12 w-auto rounded-xl sm:h-14"
                  />
                </div>
              ) : null}

              {footer.brand?.description ? (
                <p
                  className="text-muted-foreground max-w-md text-sm leading-7 text-balance break-words"
                  dangerouslySetInnerHTML={{ __html: footer.brand.description }}
                />
              ) : null}
            </div>
          </div>

          <div className="col-span-3 grid min-w-0 gap-6 sm:grid-cols-4">
            <div className="min-w-0 space-y-4 text-sm break-words">
              <span className="block font-medium tracking-[0.14em] break-words uppercase">
                Official Links
              </span>

              <div className="flex min-w-0 flex-wrap gap-4 sm:flex-col">
                {officialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary block break-words duration-150"
                  >
                    <span className="break-words">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {footer.nav?.items.map((item, idx) => (
              <div key={idx} className="min-w-0 space-y-4 text-sm break-words">
                <span className="block font-medium tracking-[0.14em] break-words uppercase">
                  {item.title}
                </span>

                <div className="flex min-w-0 flex-wrap gap-4 sm:flex-col">
                  {item.children?.map((subItem, iidx) => (
                    <Link
                      key={iidx}
                      href={subItem.url || ''}
                      target={subItem.target || ''}
                      className="text-muted-foreground hover:text-primary block break-words duration-150"
                    >
                      <span className="break-words">{subItem.title || ''}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-4 sm:gap-8">
          {footer.show_built_with !== false ? <BuiltWith /> : null}
          <div className="min-w-0 flex-1" />
          {footer.show_theme !== false ? <ThemeToggler type="toggle" /> : null}
          {footer.show_locale !== false ? (
            <LocaleSelector type="button" />
          ) : null}
        </div>

        <div
          aria-hidden
          className="h-px min-w-0 bg-[linear-gradient(90deg,transparent,var(--color-border),transparent)] opacity-80"
        />
        <div className="flex min-w-0 flex-wrap justify-between gap-8">
          {footer.copyright ? (
            <p
              className="text-muted-foreground text-sm text-balance break-words"
              dangerouslySetInnerHTML={{ __html: footer.copyright }}
            />
          ) : footer.brand ? (
            <Copyright brand={footer.brand} />
          ) : null}

          <div className="min-w-0 flex-1"></div>

          {footer.agreement ? (
            <div className="flex min-w-0 flex-wrap items-center gap-4">
              {footer.agreement?.items.map((item: NavItem, index: number) => (
                <Link
                  key={index}
                  href={item.url || ''}
                  target={item.target || ''}
                  className="text-muted-foreground hover:text-primary block text-xs break-words underline duration-150"
                >
                  {item.title || ''}
                </Link>
              ))}
            </div>
          ) : null}

          {footer.social ? (
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {footer.social?.items.map((item: NavItem, index) => (
                <Link
                  key={index}
                  href={item.url || ''}
                  target={item.target || ''}
                  className="text-muted-foreground hover:text-primary bg-background/78 border-border/70 block cursor-pointer rounded-full border p-2 backdrop-blur duration-150"
                  aria-label={item.title || 'Social media link'}
                >
                  {item.icon && (
                    <SmartIcon name={item.icon as string} size={20} />
                  )}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
