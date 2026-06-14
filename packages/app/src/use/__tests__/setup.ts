import { vi } from 'vitest'

// stub import.meta.env values used by useEnv
vi.stubEnv('VITE_SENTRY_DSN', 'https://sentry.example.com')
vi.stubEnv('VITE_BASE_URL', 'https://betterwrite.io')
vi.stubEnv('VITE_PROJECT_EMPTY', '__EMPTY__')
vi.stubEnv('VITE_LOCAL_STORAGE', '__BW_LOCAL__')
vi.stubEnv('VITE_EMPTY_LINE', '__EMPTY_LINE__')
vi.stubEnv('VITE_LINE_BREAK', '__LINE_BREAK__')
vi.stubEnv('VITE_PAGE_BREAK', '__PAGE_BREAK__')
vi.stubEnv('VITE_INITIAL_LOAD', '__INITIAL_LOAD__')
vi.stubEnv('VITE_DROPBOX_APP_KEY', 'dropbox-key')
vi.stubEnv('VITE_GOOGLE_FONTS_MAX_FONTS', '100')
vi.stubEnv('VITE_GOOGLE_FONTS_KEY', 'google-key')
vi.stubEnv('VITE_BEGINEER_LIMIT', '10')
vi.stubEnv('VITE_INTERMEDIATE_LIMIT', '50')
vi.stubEnv('VITE_ADVANCED_LIMIT', '100')
vi.stubEnv('VITE_UNLIMITED_LIMIT', '999')
vi.stubEnv('PACKAGE_VERSION', '1.0.0')
