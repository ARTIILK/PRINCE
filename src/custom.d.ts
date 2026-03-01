declare module '*.png';

interface ImportMetaEnv {
  readonly VITE_LANYARD_USER_ID: string;
  readonly VITE_DISCORD_PROFILE_URL: string;
  readonly VITE_GITHUB_PROFILE_URL: string;
  readonly VITE_DEV_COMMUNITY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
