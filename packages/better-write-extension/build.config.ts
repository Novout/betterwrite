import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	rollup: {
		emitCJS: true,
	},
	declaration: true,
	entries: [{ input: 'src/index.ts', outDir: 'dist', name: 'index' }],
	externals: ['@zip.js/zip.js', 'better-write-types', 'destr', 'xml-js'],
});
