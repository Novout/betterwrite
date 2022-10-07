import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	rollup: {
		emitCJS: true,
	},
	declaration: true,
	entries: [{ input: 'src/index.ts', outDir: 'dist', name: 'index' }],
	externals: ['better-write-plugin-exporter-pdf', 'better-write-types'],
});
