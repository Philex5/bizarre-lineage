import { npcLocations, npcRegions } from '@/content-data/npc-locations';
import { Map, Navigation } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export function NpcLocationsSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("w-64", className)}>
      <div className="sticky top-24 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-hide">
        <div>
          <div className="flex items-center gap-2 text-primary text-[0.68rem] font-semibold tracking-[0.2em] uppercase mb-4">
            <Map className="size-3.5" />
            Regions
          </div>
          <nav className="space-y-1">
            {npcRegions.map((region) => (
              <a
                key={region.key}
                href={`#region-${region.key}`}
                className="block text-muted-foreground hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg text-sm transition-all truncate"
              >
                {region.name}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <div className="flex items-center gap-2 text-primary text-[0.68rem] font-semibold tracking-[0.2em] uppercase mb-4">
            <Navigation className="size-3.5" />
            NPC List
          </div>
          <nav className="space-y-1">
            {npcLocations.map((npc) => (
              <a
                key={npc.key}
                href={`#npc-${npc.key}`}
                className="block text-muted-foreground hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg text-sm transition-all truncate"
              >
                {npc.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
