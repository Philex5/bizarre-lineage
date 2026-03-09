'use client';

import { useState } from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';

export function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    toast.success(`Code "${code}" copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={code} onCopy={handleCopy}>
      <Button 
        variant="secondary" 
        size="sm" 
        className="h-9 px-4 rounded-xl font-medium flex items-center gap-2 group-hover:bg-gold group-hover:text-white transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon className="size-4" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <CopyIcon className="size-4" />
            <span>Copy</span>
          </>
        )}
      </Button>
    </CopyToClipboard>
  );
}
