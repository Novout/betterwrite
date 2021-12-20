import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	declaration: true,
	entries: [{ input: 'src/index.ts', outDir: 'dist', name: 'index' }],
	externals: [],
});
