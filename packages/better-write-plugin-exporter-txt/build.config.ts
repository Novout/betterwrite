import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	rollup: {
		emitCJS: true,
	},
	declaration: true,
	entries: [{ input: 'src/index.ts', outDir: 'dist', name: 'index' }],
	externals: ['file-saver', 'better-write-types', 'better-write-plugin-core', 'better-write-contenteditable-ast'],
});
