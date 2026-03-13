import { getThemeBlock } from '@/core/theme';
import { Crumb } from '@/shared/blocks/common/crumb';
import { Post as PostType } from '@/shared/types/blocks/blog';
import { getTranslations } from 'next-intl/server';

export default async function StaticPage({
  locale,
  post,
}: {
  locale?: string;
  post: PostType;
}) {
  const PageDetail = await getThemeBlock('page-detail');
  const isTermsRootPage = post.slug === 'terms';
  const isTermChildPage = Boolean(post.slug?.startsWith('terms/'));
  const termTitle = post.title || '';
  const tTerms =
    isTermsRootPage || isTermChildPage
      ? await getTranslations({
          locale: locale || 'en',
          namespace: 'pages.terms',
        })
      : null;

  return (
    <>
      {isTermsRootPage || isTermChildPage ? (
        <div className="mx-auto max-w-4xl px-6 pt-24 md:px-8 md:pt-28">
          <Crumb
            items={
              isTermsRootPage
                ? [
                    {
                      title: tTerms?.('breadcrumbs.home') || 'Home',
                      url: '/',
                    },
                    {
                      title: tTerms?.('breadcrumbs.terms') || 'Terms',
                      url: '/terms',
                      is_active: true,
                    },
                  ]
                : [
                    {
                      title: tTerms?.('breadcrumbs.home') || 'Home',
                      url: '/',
                    },
                    {
                      title: tTerms?.('breadcrumbs.terms') || 'Terms',
                      url: '/terms',
                    },
                    {
                      title: termTitle,
                      url: post.url || `/${locale || 'en'}/${post.slug || ''}`,
                      is_active: true,
                    },
                  ]
            }
          />
        </div>
      ) : null}
      <PageDetail post={post} />
    </>
  );
}
