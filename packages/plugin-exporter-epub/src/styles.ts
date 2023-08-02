import { PluginTypes } from 'better-write-types'

export const getStyles = (
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
): string => `* {
  margin: 0;
  padding: 0;
  outline: 0;
  font-feature-settings: 'ss02' on, 'ss01' on;
  -webkit-font-smoothing: antialiased;
}

p {
  text-indent: 1.75rem;
}

p > a {
  text-decoration: none;
}

h1, h2, h3 {
  text-align: center;
}

h1 {
  padding: 5rem 0 3.5rem 0;
}

h2 {
  padding: 1.85rem 0;
}

h3 {
  padding: 1.35rem 0;
}

i {
  font-style: italic;
}

b {
  font-weight: 700;
}`
