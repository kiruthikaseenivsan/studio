import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { usageByCountry } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Approximate positions for dots on the map image
const dotPositions: Record<string, { top: string; left: string }> = {
  USA: { top: '35%', left: '22%' },
  India: { top: '45%', left: '62%' },
  UK: { top: '28%', left: '48%' },
  Canada: { top: '30%', left: '25%' },
};

export default function MapChart() {
  const mapImage = placeholderImages.find((p) => p.id === 'world-map');

  return (
    <div className="space-y-4">
      <div className="relative aspect-[2/1] w-full">
        {mapImage && (
          <Image
            src={mapImage.imageUrl}
            alt={mapImage.description}
            data-ai-hint={mapImage.imageHint}
            fill
            className="rounded-lg object-cover"
          />
        )}
        <TooltipProvider>
          {usageByCountry.map((item) => {
            const position = dotPositions[item.country];
            if (!position) return null;

            return (
              <Tooltip key={item.country}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full"
                    style={{
                      top: position.top,
                      left: position.left,
                      backgroundColor: item.fill,
                      boxShadow: `0 0 8px ${item.fill}`,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`${item.country}: ${item.value}%`}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
        {usageByCountry.map((item) => (
          <div key={item.country} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span>{item.country}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
