import { ReactNode } from 'react';

import { AnalyticsConfigs, AnalyticsProvider } from '.';

/**
 * Plausible analytics configs
 * @docs https://plausible.io/docs/integration-guides
 */
export interface PlausibleAnalyticsConfigs extends AnalyticsConfigs {
  domain: string; // data domain
  src: string; // script src
}

/**
 * Plausible provider
 * @website https://plausible.io/
 */
export class PlausibleAnalyticsProvider implements AnalyticsProvider {
  readonly name = 'plausible';

  configs: PlausibleAnalyticsConfigs;

  constructor(configs: PlausibleAnalyticsConfigs) {
    this.configs = configs;
  }

  getHeadScripts(): ReactNode {
    // Plausible domain should not include protocol (http:// or https://) or trailing slash
    const domain = (this.configs.domain || '')
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');
    
    if (!domain || !this.configs.src) {
      return null;
    }

    return (
      <>
        {/* Plausible Analytics */}
        <script
          id="plausible-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
            `,
          }}
        />
        <script
          defer
          data-domain={domain}
          src={this.configs.src}
        />
      </>
    );
  }
}
