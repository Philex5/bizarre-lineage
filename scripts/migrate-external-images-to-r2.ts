import { AwsClient } from 'aws4fetch';

type AssetMapping = {
  sourceUrl: string;
  targetKey: string;
};

const assetMappings: AssetMapping[] = [
  {
    sourceUrl:
      'https://trello.com/1/cards/69713d0671067a15e9fa2a8a/attachments/69a47d67eb1236308633c559/download/image.png',
    targetKey: 'assets/pages/terms/raid/hero.png',
  },
  {
    sourceUrl:
      'https://trello.com/1/cards/6953030500874d0dc5346233/attachments/6975739de52649b8b02b525c/download/prestige.png',
    targetKey: 'assets/pages/terms/prestige/hero.png',
  },
  {
    sourceUrl:
      'https://trello.com/1/cards/6959b48f94eb0c94a4036059/attachments/6959b48f94eb0c94a4036087/download/awakening.png',
    targetKey: 'assets/pages/terms/awakening/hero.png',
  },
  {
    sourceUrl:
      'https://trello.com/1/cards/69530cc85bf78fb14d510291/attachments/69761f762eaf03ec4ec93507/download/image.png',
    targetKey: 'assets/pages/terms/stand-arrow/hero.png',
  },
  {
    sourceUrl:
      'https://trello.com/1/cards/69531c612fbbcef6ddae5477/attachments/6976317b4e9db678d4a643a5/download/Screenshot2026-01-25170437-ezgif.com-resize.jpg',
    targetKey: 'assets/pages/terms/fighting-styles/hero.jpg',
  },
  {
    sourceUrl:
      'https://trello.com/1/cards/695946dffbe09e75b7d4b974/attachments/699bc6a9b163c27099d53663/download/image-ezgif.com-resize_(1).png',
    targetKey: 'assets/pages/terms/sub-abilities/hero.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/made-in-heaven-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/made-in-heaven/card.jpg',
  },
  {
    sourceUrl: 'https://bloxinformer.com/wp-content/uploads/2026/01/White-Snake.png',
    targetKey: 'assets/stands/whitesnake/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/cmoon-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/c-moon/card.jpg',
  },
  {
    sourceUrl: 'https://bloxinformer.com/wp-content/uploads/2026/01/The-World-man.png',
    targetKey: 'assets/stands/the-world/card.png',
  },
  {
    sourceUrl: 'https://bloxinformer.com/wp-content/uploads/2026/01/sacsfsfasfa.png',
    targetKey: 'assets/stands/star-platinum/card.png',
  },
  {
    sourceUrl:
      'https://destructoid.com/wp-content/uploads/2026/02/king-crimson-stand-bizarre-lineage.png',
    targetKey: 'assets/stands/king-crimson/card.png',
  },
  {
    sourceUrl:
      'https://destructoid.com/wp-content/uploads/2026/02/weather-report-stand-bizarre-lineage.png',
    targetKey: 'assets/stands/weather-report/card.jpg',
  },
  {
    sourceUrl:
      'https://destructoid.com/wp-content/uploads/2026/02/the-world-high-voltage-stand-bizarre-lineage.png',
    targetKey: 'assets/stands/the-world-high-voltage/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/Killer-Queen-Stand-Bizarre-Lineage.png',
    targetKey: 'assets/stands/killer-queen/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/Roblox-Anubis-Stand-Bizarre-Lineage.png',
    targetKey: 'assets/stands/anubis/card.png',
  },
  {
    sourceUrl: 'https://bloxinformer.com/wp-content/uploads/2026/01/Golden_Wind.png',
    targetKey: 'assets/stands/golden-experience/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/stone-free-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/stone-free/card.jpg',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/magicians-red-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/magicians-red/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/crazy-diamond-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/crazy-diamond/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/purple-haze-pepper-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/purple-haze/card.png',
  },
  {
    sourceUrl: 'https://bloxinformer.com/wp-content/uploads/2026/01/The-Hand.png',
    targetKey: 'assets/stands/the-hand/card.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/01/red-hot-chilly-pepper-stand-bizarre-lineage.jpg',
    targetKey: 'assets/stands/red-hot-chilly-pepper/card.png',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-hero/1200/800',
    targetKey: 'assets/stands/star-platinum/hero.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-bg/1600/900',
    targetKey: 'assets/stands/star-platinum/background.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-introduce/1200/800',
    targetKey: 'assets/stands/star-platinum/introduce.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-0/800/600',
    targetKey: 'assets/stands/star-platinum/item-0.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-1/800/600',
    targetKey: 'assets/stands/star-platinum/item-1.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-2/800/600',
    targetKey: 'assets/stands/star-platinum/item-2.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-3/800/600',
    targetKey: 'assets/stands/star-platinum/item-3.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-10/800/600',
    targetKey: 'assets/stands/star-platinum/item-10.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-11/800/600',
    targetKey: 'assets/stands/star-platinum/item-11.webp',
  },
  {
    sourceUrl: 'https://picsum.photos/seed/stands-star-platinum-item-12/800/600',
    targetKey: 'assets/stands/star-platinum/item-12.webp',
  },
];

const contentTypeFallbacks: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
};

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, '');
}

function inferContentType(key: string, response: Response): string {
  const responseType = response.headers.get('content-type')?.split(';')[0]?.trim();
  if (responseType) {
    return responseType;
  }

  const extension = key.split('.').pop()?.toLowerCase() ?? '';
  return contentTypeFallbacks[extension] ?? 'application/octet-stream';
}

async function uploadAsset(
  client: AwsClient,
  endpoint: string,
  bucket: string,
  mapping: AssetMapping
): Promise<string> {
  const sourceResponse = await fetch(mapping.sourceUrl, { redirect: 'follow' });
  if (!sourceResponse.ok) {
    throw new Error(
      `Failed to download ${mapping.sourceUrl}: ${sourceResponse.status} ${sourceResponse.statusText}`
    );
  }

  const body = new Uint8Array(await sourceResponse.arrayBuffer());
  const contentType = inferContentType(mapping.targetKey, sourceResponse);
  const targetUrl = `${endpoint}/${bucket}/${mapping.targetKey}`;

  const uploadResponse = await client.fetch(targetUrl, {
    method: 'PUT',
    headers: {
      'Content-Disposition': 'inline',
      'Content-Length': body.length.toString(),
      'Content-Type': contentType,
    },
    body,
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `Failed to upload ${mapping.targetKey}: ${uploadResponse.status} ${uploadResponse.statusText}`
    );
  }

  return contentType;
}

async function main() {
  const endpoint = normalizeBaseUrl(getRequiredEnv('STORAGE_ENDPOINT'));
  const bucket = getRequiredEnv('STORAGE_BUCKET');
  const accessKeyId = getRequiredEnv('STORAGE_ACCESS_KEY');
  const secretAccessKey = getRequiredEnv('STORAGE_SECRET_KEY');
  const region = process.env.STORAGE_REGION?.trim() || 'auto';
  const publicDomain = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_STORAGE_DOMAIN?.trim() ||
      getRequiredEnv('STORAGE_DOMAIN')
  );

  const client = new AwsClient({
    accessKeyId,
    secretAccessKey,
    region,
  });

  for (const mapping of assetMappings) {
    const contentType = await uploadAsset(client, endpoint, bucket, mapping);
    console.log(
      JSON.stringify({
        sourceUrl: mapping.sourceUrl,
        targetKey: mapping.targetKey,
        publicUrl: `${publicDomain}/${mapping.targetKey}`,
        contentType,
      })
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
