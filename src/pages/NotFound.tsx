import React from 'react';
import { InkButton } from '../components/InkButton';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { Compass, Home as HomeIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none">
      <div className="max-w-xl mx-auto space-y-6 parchment-card rounded-3xl p-10 parchment-border shadow-ink-lg">
        <div className="w-20 h-20 rounded-full bg-sepia-ink/10 flex items-center justify-center text-sepia-ink mx-auto border border-sepia-ink/20">
          <Compass className="w-10 h-10 stroke-[1.5]" />
        </div>

        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          EX HERBARIUM ERROR 404
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          Page Not Found
        </h1>

        <p className="font-sans text-sm text-ink-secondary leading-relaxed">
          The field notebook folio or module path you requested does not exist in this edition of the Project Beatrice V2 archive.
        </p>

        <BotanicalDivider />

        <div className="pt-2">
          <InkButton
            asLink="/"
            variant="primary"
            size="md"
            icon={<HomeIcon className="w-4 h-4" />}
          >
            Return to Homepage
          </InkButton>
        </div>
      </div>
    </div>
  );
};
