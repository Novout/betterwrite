import { PluginTypes } from 'better-write-types'

export const getStyles = (
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
): string => `* {
  margin: 0;
  padding: 0;
  outline: 0;
  font-feature-settings: 'ss02' on, 'ss01' on;
  -webkit-font-smoothing: antialiased;
  color: black;
}

p {
  font-size: 18px;
  text-indent: 1.5rem;
  color: black;
}

p > a {
  text-decoration: none;
  color: black !important;
}

h1, h2, h3 {
  text-align: center;
}

i {
  font-style: italic;
}

b {
  font-weight: 700;
}`
