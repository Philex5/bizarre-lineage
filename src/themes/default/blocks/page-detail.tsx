import { CalendarIcon } from 'lucide-react';

import { MarkdownPreview } from '@/shared/blocks/common';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
import { type Post as PostType } from '@/shared/types/blocks/blog';

import '@/config/style/docs.css';

export async function PageDetail({ post }: { post: PostType }) {
  const isTermsHub = post.slug === 'terms';
  const isTermsChildPage = Boolean(post.slug?.startsWith('terms/'));
  const isSubAbilitiesPage =
    post.slug === 'terms/sub-abilities' ||
    Boolean(post.slug?.startsWith('terms/sub-abilities/'));
  const shouldRenderBottomAd =
    (isTermsHub || isTermsChildPage) && post.slug !== 'terms/sub-abilities';
  const sectionSpacingClass = isTermsHub
    ? 'pt-4 pb-24 md:pt-5 md:pb-32'
    : isTermsChildPage
      ? 'pt-4 pb-24 md:pt-6 md:pb-32'
      : 'py-24 md:py-32';

  return (
    <section id={post.id}>
      <div className={sectionSpacingClass}>
        <div
          className={`mx-auto w-full px-6 md:px-8 ${
            isSubAbilitiesPage ? 'max-w-6xl' : 'max-w-4xl'
          }`}
        >
          <div
            className={
              isTermsHub
                ? 'mt-0 text-center'
                : isTermsChildPage
                  ? 'mt-2 text-center'
                  : 'mt-16 text-center'
            }
          >
            <h1
              className={
                isTermsHub
                  ? 'text-foreground mx-auto mb-2 w-full text-xl font-bold md:max-w-4xl md:text-4xl'
                  : 'text-foreground mx-auto mb-4 w-full text-xl font-bold md:max-w-4xl md:text-4xl'
              }
            >
              {post.title}
            </h1>
            <div
              className={
                isTermsHub
                  ? 'text-muted-foreground text-md mb-5 flex items-center justify-center gap-4'
                  : 'text-muted-foreground text-md mb-8 flex items-center justify-center gap-4'
              }
            >
              {post.description}
            </div>
            {post.created_at && (
              <div
                className={
                  isTermsHub
                    ? 'text-muted-foreground text-md mb-5 flex items-center justify-center gap-2'
                    : 'text-muted-foreground text-md mb-8 flex items-center justify-center gap-2'
                }
              >
                <CalendarIcon className="size-4" /> {post.created_at}
              </div>
            )}
          </div>

          <div className="ring-foreground/5 relative mt-8 rounded-3xl border border-transparent px-4 shadow ring-1 md:px-8">
            <div>
              {post.body ? (
                <div className="docs text-foreground text-md my-8 space-y-4 font-normal *:leading-relaxed">
                  {post.body}
                </div>
              ) : (
                <>
                  {post.content && (
                    <div className="text-muted-foreground my-8 space-y-4 text-lg *:leading-relaxed">
                      <MarkdownPreview content={post.content} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {shouldRenderBottomAd ? (
            <div className="mt-10">
              <AdsterraBanner />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
