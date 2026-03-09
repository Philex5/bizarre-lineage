'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';

export function HomeCodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    toast.success(`Copied ${code}`);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <CopyToClipboard text={code} onCopy={handleCopy}>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="text-foreground border-border bg-background hover:bg-accent hover:text-foreground shrink-0 rounded-xl px-3 text-xs shadow-sm dark:border-white/12 dark:bg-white/6 dark:text-white dark:hover:bg-white/12 dark:hover:text-white"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </CopyToClipboard>
  );
}
