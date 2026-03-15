import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
import { cn } from '@/shared/lib/utils';
import { Post as PostType } from '@/shared/types/blocks/blog';
import { Section } from '@/shared/types/blocks/landing';

export function Updates({
  section,
  className,
  posts,
}: {
  section: Section;
  className?: string;
  posts: PostType[];
}) {
  return (
    <section
      id={section.id}
      className={cn('py-24 md:py-36', section.className, className)}
    >
      <div className="mx-auto mb-12 text-center">
        <h1 className="mb-6 text-3xl font-bold text-pretty lg:text-4xl">
          {section.title}
        </h1>
        <p className="text-muted-foreground mb-4 max-w-xl lg:max-w-none lg:text-lg">
          {section.description}
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-4 lg:px-10">
        <div className="grid gap-6">
          {posts?.length > 0 && (
            <aside>
              <AdsterraBanner />
            </aside>
          )}

          {posts?.length === 0 && (
            <div className="bg-card border-border rounded-[1.75rem] border px-6 py-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold">
                No updates published yet
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-7">
                This page is ready. Once new Bizarre Lineage changes are
                verified from official-facing channels, each update will appear
                here as its own card.
              </p>
            </div>
          )}

          {posts?.map((post) => {
            const shouldRenderAd =
              posts.length > 2 && (posts.indexOf(post) + 1) % 2 === 0;

            return (
              <div key={post.url} className="space-y-6">
                <article className="bg-card border-border overflow-hidden rounded-[1.75rem] border shadow-sm">
                  <div className="border-border/70 bg-muted/35 flex flex-wrap items-center gap-3 border-b px-5 py-4 sm:px-6">
                    {post.version && (
                      <div className="text-foreground border-primary text-primary inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-bold">
                        v{post.version}
                      </div>
                    )}
                    {post.date && (
                      <time className="text-muted-foreground text-sm font-medium">
                        {post.date}
                      </time>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="bg-background text-muted-foreground flex h-6 w-fit items-center justify-center rounded-full border px-2 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-5 px-5 py-6 sm:px-6 sm:py-7">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-semibold tracking-tight text-balance">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-muted-foreground max-w-3xl text-base leading-7">
                          {post.description}
                        </p>
                      )}
                    </div>
                    <div className="prose dark:prose-invert prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance max-w-none">
                      {post.body}
                    </div>
                  </div>
                </article>

                {shouldRenderAd && (
                  <aside className="bg-card border-border rounded-[1.75rem] border px-4 py-4 shadow-sm sm:px-5">
                    <div className="text-muted-foreground mb-3 text-center text-[0.7rem] font-semibold tracking-[0.22em] uppercase">
                      Sponsored
                    </div>
                    <AdsterraBanner />
                  </aside>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
