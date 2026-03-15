import { AwsClient } from 'aws4fetch';

type AssetMapping = {
  sourceUrl: string;
  targetKey: string;
};

const assetMappings: AssetMapping[] = [
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/03/Dio-Raid-Bizarre-Lineage.png',
    targetKey: 'assets/pages/guides/dio-raid/hero.png',
  },
  {
    sourceUrl:
      'https://bloxinformer.com/wp-content/uploads/2026/03/cathedral-bizarre-lineage.png',
    targetKey: 'assets/pages/guides/dio-raid/location.png',
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
