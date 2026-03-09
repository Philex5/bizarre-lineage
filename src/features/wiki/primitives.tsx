import { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

export function PageShell({
  children,
  accent = 'ember',
}: {
  children: ReactNode;
  accent?: 'ember' | 'jade' | 'violet' | 'gold';
}) {
  return (
    <main
      className="relative overflow-hidden pt-24 pb-20 md:pt-28"
      data-accent={accent}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-background)_94%,white)_0%,var(--color-background)_38%,color-mix(in_oklab,var(--color-secondary)_55%,var(--color-background))_100%)] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-background)_92%,black)_0%,var(--color-background)_38%,color-mix(in_oklab,var(--color-secondary)_35%,var(--color-background))_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--color-primary)_12%,transparent)_0,transparent_34%),radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--color-accent)_10%,transparent)_0,transparent_26%),radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--color-primary)_18%,transparent)_0,transparent_34%),radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--color-accent)_12%,transparent)_0,transparent_26%),radial-gradient(circle_at_50%_120%,color-mix(in_oklab,white_4%,transparent)_0,transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,color-mix(in_oklab,white_65%,transparent),transparent)] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,white_5%,transparent),transparent)]" />
      </div>
      <div className="relative container space-y-10 md:space-y-14">
        {children}
      </div>
    </main>
  );
}

export function HeroFrame({
  eyebrow,
  title,
  dek,
  stats,
  actions,
  aside,
  backgroundImageSrc,
  backgroundImageAlt,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  stats?: Array<{ label: string; value: string }>;
  actions?: ReactNode;
  aside?: ReactNode;
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
  mediaLabel?: string;
}) {
  return (
    <section
      className={cn(
        'grid gap-6 lg:items-stretch',
        aside ? 'lg:grid-cols-[minmax(0,1.45fr)_23rem]' : 'lg:grid-cols-1'
      )}
    >
      <div className="relative overflow-hidden rounded-[2.2rem]">
        {backgroundImageSrc ? (
          <div className="absolute inset-0">
            <Image
              src={backgroundImageSrc}
              alt={backgroundImageAlt || ''}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-foreground)_92%,black)_0%,color-mix(in_oklab,var(--color-foreground)_84%,transparent)_34%,color-mix(in_oklab,var(--color-foreground)_56%,transparent)_62%,color-mix(in_oklab,var(--color-foreground)_84%,black)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,black_18%,transparent)_0%,transparent_20%,color-mix(in_oklab,black_44%,transparent)_100%)]" />
          </div>
        ) : null}

        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_20%,transparent),transparent)]" />

        <div className="relative flex min-h-[85vh] items-end px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-18">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-white/18 bg-black/18 px-3 py-1 text-[0.68rem] tracking-[0.24em] text-white uppercase backdrop-blur-sm"
            >
              {eyebrow}
            </Badge>
            <h1 className="font-serif text-4xl leading-[0.9] tracking-[-0.05em] text-balance text-white sm:text-5xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-7 text-white/82 md:text-lg">
              {dek}
            </p>
            {actions ? (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            ) : null}
            {stats && stats.length > 0 ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.35rem] border border-white/12 bg-black/24 p-4 backdrop-blur-md"
                  >
                    <div className="text-[0.66rem] tracking-[0.22em] text-white/70 uppercase">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {aside ? (
        <div className="border-border bg-card text-card-foreground relative overflow-hidden rounded-[2rem] border p-6 shadow-lg">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_8%,transparent)_0%,transparent_24%),linear-gradient(color-mix(in_oklab,var(--color-foreground)_5%,transparent)_1px,transparent_1px)] bg-[length:100%_100%,18px_18px]" />
          <div className="relative h-full">{aside}</div>
        </div>
      ) : null}
    </section>
  );
}

export function HeroActions({
  primary,
  secondary,
}: {
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <>
      <Button
        asChild
        size="lg"
        className="rounded-full px-6 text-sm tracking-[0.16em] uppercase"
      >
        <Link href={primary.href}>
          {primary.label}
          <ArrowRight />
        </Link>
      </Button>
      {secondary ? (
        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full border-white/16 bg-white/8 px-6 text-sm tracking-[0.16em] text-white uppercase backdrop-blur-sm hover:bg-white/14"
        >
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      ) : null}
    </>
  );
}

export function AsidePanel({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="text-muted-foreground text-[0.68rem] tracking-[0.24em] uppercase">
        Guide Notes
      </div>
      <h2 className="mt-3 font-serif text-3xl leading-none tracking-[-0.04em]">
        {title}
      </h2>
      <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-6">
        {description}
      </p>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-background/88 border-border rounded-[1.35rem] border p-4"
          >
            <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
              {item.label}
            </div>
            <div className="text-foreground mt-2 text-lg font-medium">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-border bg-card/92 relative overflow-hidden rounded-[2rem] border p-6 shadow-lg backdrop-blur-sm md:p-8"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent),var(--color-primary))] opacity-90" />
      <div className="max-w-3xl">
        <div className="text-muted-foreground text-[0.7rem] tracking-[0.24em] uppercase">
          {eyebrow}
        </div>
        <h2 className="text-foreground mt-3 font-serif text-3xl leading-none tracking-[-0.04em] md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-3 text-sm leading-7 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function CardGrid({
  items,
  columns = 3,
}: {
  items: Array<{
    title: string;
    description: string;
    meta?: string;
    href?: string;
    target?: string;
  }>;
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 4
      ? 'lg:grid-cols-4'
      : columns === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  return (
    <div className={cn('grid gap-4 md:grid-cols-2', gridClass)}>
      {items.map((item) => {
        const content = (
          <div className="group bg-background/92 border-border relative overflow-hidden rounded-[1.6rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)]" />
            {item.meta ? (
              <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                {item.meta}
              </div>
            ) : null}
            <h3 className="text-foreground mt-2 text-xl font-semibold tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {item.description}
            </p>
          </div>
        );

        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            target={item.target}
            className="block"
          >
            {content}
          </Link>
        ) : (
          <div key={item.title}>{content}</div>
        );
      })}
    </div>
  );
}

export function GuideCard({
  title,
  description,
  meta,
  href,
}: {
  title: string;
  description: string;
  meta?: string;
  href?: string;
}) {
  const content = (
    <div className="group bg-background/92 border-border relative flex aspect-[3/4] flex-col overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-background/98 md:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)]" />
      
      {meta && (
        <div className="text-muted-foreground mb-4 text-[0.68rem] font-medium tracking-[0.24em] uppercase opacity-80">
          {meta}
        </div>
      )}
      
      <h3 className="text-foreground font-serif text-2xl font-bold leading-[1.1] tracking-[-0.04em] group-hover:text-primary transition-colors md:text-3xl">
        {title}
      </h3>
      
      <p className="text-muted-foreground mt-6 text-sm leading-7 line-clamp-6 md:text-base">
        {description}
      </p>

      <div className="mt-auto flex justify-end pt-6">
         <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300">
            <ArrowRight className="size-6" />
         </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

export function OrderedChecklist({
  items,
}: {
  items: Array<{
    title: string;
    description: string;
    href?: string;
    hrefLabel?: string;
  }>;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="bg-background/92 border-border grid gap-4 rounded-[1.6rem] border p-5 shadow-sm md:grid-cols-[4.5rem_minmax(0,1fr)]"
        >
          <div className="bg-primary text-primary-foreground border-primary/25 flex h-14 w-14 items-center justify-center rounded-[1.2rem] border text-lg font-semibold shadow-sm">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div>
            <h3 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-7">
              {item.description}
            </p>
            {item.href && item.hrefLabel ? (
              <Link
                href={item.href}
                className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] uppercase"
              >
                {item.hrefLabel}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SplitNotes({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
}: {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="border-accent/20 bg-accent/8 rounded-[1.6rem] border p-5">
        <h3 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
          {leftTitle}
        </h3>
        <ul className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
          {leftItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="bg-accent mt-2 size-2 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-primary/18 bg-primary/7 rounded-[1.6rem] border p-5">
        <h3 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
          {rightTitle}
        </h3>
        <ul className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
          {rightItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="bg-primary mt-2 size-2 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FaqGrid({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.question}
          className="bg-background/92 border-border rounded-[1.6rem] border p-5"
        >
          <h3 className="text-foreground text-lg font-semibold tracking-[-0.03em]">
            {item.question}
          </h3>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {item.answer}
          </p>
        </article>
      ))}
    </div>
  );
}
