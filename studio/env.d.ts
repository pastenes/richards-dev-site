// The studio build replaces `process.env.SANITY_STUDIO_*` with values from studio/.env files.
declare const process: {env: {SANITY_STUDIO_SITE_URL?: string}}
