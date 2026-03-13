import { AwsClient } from 'aws4fetch';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

type LocalAssetMapping = {
  localPath: string;
  targetKey: string;
};

const assetMappings: LocalAssetMapping[] = [
  {
    localPath: 'public/start.png',
    targetKey: 'assets/pages/guides/beginner-guide/start.png',
  },
  {
    localPath: 'public/bus.png',
    targetKey: 'assets/pages/guides/beginner-guide/bus.png',
  },
  {
    localPath: 'public/gym.png',
    targetKey: 'assets/pages/guides/beginner-guide/gym.png',
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

function inferContentType(key: string): string {
  const extension = key.split('.').pop()?.toLowerCase() ?? '';
  return contentTypeFallbacks[extension] ?? 'application/octet-stream';
}

async function uploadLocalAsset(
  client: AwsClient,
  endpoint: string,
  bucket: string,
  mapping: LocalAssetMapping
): Promise<string> {
  const fullLocalPath = join(process.cwd(), mapping.localPath);
  if (!existsSync(fullLocalPath)) {
    throw new Error(`Local file not found: ${fullLocalPath}`);
  }

  const body = readFileSync(fullLocalPath);
  const contentType = inferContentType(mapping.targetKey);
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
    const contentType = await uploadLocalAsset(client, endpoint, bucket, mapping);
    console.log(
      JSON.stringify({
        localPath: mapping.localPath,
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
