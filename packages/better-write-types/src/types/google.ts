export interface GoogleFont {
	kind: string;
	family: string;
	variants?: Array<string>;
	subsets?: Array<string>;
	version: string;
	lastModified: string;
	files: GoogleFontFiles;
}

interface GoogleFontFiles {
	[key: string]: string;
}
