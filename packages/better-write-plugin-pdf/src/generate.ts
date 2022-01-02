import { On } from 'better-write-plugin-core';
import { ContextState, Entity, PluginTypes } from 'better-write-types';
import { getPDFUtils } from 'better-write-plugin-theme';
import { nextTick } from 'vue-demi';
import { useNProgress } from '@vueuse/integrations';
import { useToast } from 'vue-toastification';
import * as pdfMake from 'pdfmake/build/pdfmake';

export const PluginPDFSet = (
	emitter: PluginTypes.PluginEmitter,
	stores: PluginTypes.PluginStores,
	hooks: PluginTypes.PluginHooks
) => {
	const { isLoading } = useNProgress();
	const toast = useToast();

	const isTheme = stores.PDF.styles.switcher.theme;
	const { theme } = getPDFUtils();

	const generate = () => {
		const headingOne = (raw: string) => {
			return {
				text: raw,
				margin: [
					generate().base().pageMargins[0],
					stores.PDF.styles.headingOne.margin.top,
					generate().base().pageMargins[2],
					stores.PDF.styles.headingOne.margin.bottom,
				],
				pageBreak:
					stores.PDF.styles.headingOne.breakPage && !hooks.project.isBlankProject()
						? 'before'
						: undefined,
				style: 'heading-one',
				tocItem:
					stores.PDF.styles.switcher.summary && stores.PDF.styles.base.summary.type === 'default',
			};
		};

		const headingTwo = (raw: string) => {
			return {
				text: raw,
				margin: [
					generate().base().pageMargins[0],
					stores.PDF.styles.headingTwo.margin.top,
					generate().base().pageMargins[2],
					stores.PDF.styles.headingTwo.margin.bottom,
				],
				style: 'heading-two',
				tocItem:
					stores.PDF.styles.switcher.summary &&
					hooks.project.isBlankProject() &&
					stores.PDF.styles.base.summary.type === 'default',
			};
		};

		const headingThree = (raw: string) => {
			return {
				text: raw,
				margin: [
					generate().base().pageMargins[0],
					stores.PDF.styles.headingThree.margin.top,
					generate().base().pageMargins[2],
					stores.PDF.styles.headingThree.margin.bottom,
				],
				style: 'heading-three',
			};
		};

		const paragraph = (raw: string) => {
			let indent = '';

			for (let i = 0; i < stores.PDF.styles.paragraph.indent; i++) {
				indent += '\t';
			}

			return {
				text: hooks.raw
					.v2()
					.purge()
					.pdf(indent + raw),
				style: 'paragraph',
				preserveLeadingSpaces: true,
				margin: [
					generate().base().pageMargins[0],
					stores.PDF.styles.paragraph.margin.top,
					generate().base().pageMargins[2],
					stores.PDF.styles.paragraph.margin.bottom,
				],
			};
		};

		const pageBreak = () => {
			return {
				text: '',
				style: 'page-break',
				pageBreak: 'after',
			};
		};

		const lineBreak = (value = 10) => {
			return {
				text: '',
				margin: [0, value],
				style: 'line-break',
			};
		};

		const image = (entity: Entity) => {
			if (entity.external?.image?.alignment === 'full') {
				if (entity.external.image.name.includes('svg')) {
					return {
						svg: entity.raw,
						width:
							hooks.defines.pdf().base().pageSizeFixes()[stores.PDF.styles.base.pageSize][0] -
							generate().base().pageMargins[0] -
							generate().base().pageMargins[2],
						margin: [generate().base().pageMargins[0], 10, generate().base().pageMargins[2], 10],
					};
				}

				return {
					image: entity.raw,
					width:
						hooks.defines.pdf().base().pageSizeFixes()[stores.PDF.styles.base.pageSize][0] -
						generate().base().pageMargins[0] -
						generate().base().pageMargins[2],
					margin: [generate().base().pageMargins[0], 10, generate().base().pageMargins[2], 10],
				};
			} else {
				if (entity.external?.image?.name.includes('svg')) {
					return {
						svg: entity.raw,
						width: entity.external?.image?.size.width,
						height: entity.external?.image?.size.height,
						alignment: entity.external?.image?.alignment,
						margin: [
							entity.external?.image?.alignment === 'center'
								? 0
								: generate().base().pageMargins[0] / 2,
							10,
							entity.external?.image?.alignment === 'right' ||
							entity.external?.image?.alignment === 'center'
								? 0
								: generate().base().pageMargins[2] / 2,
							10,
						],
					};
				}

				return {
					image: entity.raw,
					width: entity.external?.image?.size.width,
					height: entity.external?.image?.size.height,
					alignment: entity.external?.image?.alignment,
					margin: [
						entity.external?.image?.alignment === 'center' ? 0 : generate().base().pageMargins[0],
						10,
						entity.external?.image?.alignment === 'right' ||
						entity.external?.image?.alignment === 'center'
							? 0
							: generate().base().pageMargins[2],
						10,
					],
				};
			}
		};

		const frontCover = (arr: Array<any>) => {
			if (stores.PDF.styles.switcher.cover) {
				if (!stores.PDF.styles.base.background.data) return;

				let _raw = {
					image: stores.PDF.styles.base.background.data,
					pageBreak: 'after',
					width: hooks.defines.pdf().base().pageSizeFixes()[stores.PDF.styles.base.pageSize][0],
					height: hooks.defines.pdf().base().pageSizeFixes()[stores.PDF.styles.base.pageSize][1],
				};

				arr.push(_raw);
			} else {
				let _title = {
					text: stores.PROJECT.nameRaw,
					fontSize: 42,
					font: stores.PDF.styles.headingOne.font,
					color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
					alignment: 'center',
					margin: [0, 50],
				};

				let _subject = {
					text: stores.PROJECT.subject,
					fontSize: 11,
					font: stores.PDF.styles.paragraph.font,
					margin: [generate().base().pageMargins[0], 50, generate().base().pageMargins[2], 0],
					color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
					alignment: 'center',
				};

				let _creator = {
					text: stores.PROJECT.creator,
					fontSize: 11,
					font: stores.PDF.styles.paragraph.font,
					margin: [generate().base().pageMargins[0], 250, generate().base().pageMargins[2], 0],
					color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
					alignment: 'left',
					pageBreak: 'after',
				};

				/*
        let _version = {
          text: stores.PROJECT.creator,
          fontSize: 11,
          font: stores.PDF.styles.paragraph.font,
					color: generate().styles().isTheme ? generate().styles().theme.paragraph : stores.PDF.styles.paragraph.color,
          margin: [10, 10],
          alignment: 'left',
        }
        */

				arr.push(_title);
				arr.push(_subject);
				arr.push(_creator);
			}
		};

		const summary = (arr: Array<any>) => {
			if (stores.PDF.styles.switcher.summary) {
				let _raw = {
					toc: {
						title: {
							text: stores.PROJECT.nameRaw,
							font: stores.PDF.styles.base.summary.fontFamily,
							fontSize: stores.PDF.styles.base.summary.fontSize,
						},
					},
					pageBreak: 'before',
					alignment: 'center',
					font: stores.PDF.styles.base.summary.fontFamily,
					style: 'summary-default',
				};

				arr.push(_raw);
			}
		};

		const content = (): Array<any> => {
			const pages: Array<ContextState> = stores.PROJECT.pages;
			const arr: Array<any> = [];

			if (hooks.project.isCreativeProject()) {
				frontCover(arr);
				summary(arr);
			}

			pages.forEach((page: ContextState) => {
				page.entities.forEach((entity: Entity) => {
					let _raw = {};

					if (entity.raw === hooks.env.emptyLine()) {
						_raw = lineBreak(5);
						arr.push(_raw);
						return;
					}

					if ((entity as any).type === 'paragraph') {
						_raw = paragraph(entity.raw);
					} else if (entity.type === 'heading-one') {
						_raw = headingOne(entity.raw);
					} else if (entity.type === 'heading-two') {
						_raw = headingTwo(entity.raw);
					} else if (entity.type === 'heading-three') {
						_raw = headingThree((entity as any).raw);
					} else if (entity.type === 'page-break') {
						_raw = pageBreak();
					} else if (entity.type === 'line-break') {
						_raw = lineBreak();
					} else if (entity.type === 'image') {
						_raw = image(entity);
					}

					arr.push(_raw);
				});
			});

			return arr;
		};

		const base = (): Record<string, any> => {
			return {
				pageSize: stores.PDF.styles.base.pageSize,
				pageOrientation: stores.PDF.styles.base.pageOrientation,
				pageMargins: [
					stores.PDF.styles.base.pageMargins.left,
					stores.PDF.styles.base.pageMargins.top,
					stores.PDF.styles.base.pageMargins.right,
					stores.PDF.styles.base.pageMargins.bottom,
				],
			};
		};

		const styles = () => {
			const paragraph = () => {
				return {
					font: stores.PDF.styles.paragraph.font,
					fontSize: stores.PDF.styles.paragraph.fontSize,
					lineHeight: stores.PDF.styles.paragraph.lineHeight,
					alignment: stores.PDF.styles.paragraph.alignment,
					characterSpacing: stores.PDF.styles.paragraph.characterSpacing,
					color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
					decorationColor: stores.PDF.styles.paragraph.decorationColor,
				};
			};

			const headingOne = () => {
				return {
					font: stores.PDF.styles.headingOne.font,
					fontSize: stores.PDF.styles.headingOne.fontSize,
					lineHeight: stores.PDF.styles.headingOne.lineHeight,
					bold: stores.PDF.styles.headingOne.bold,
					italics: stores.PDF.styles.headingOne.italics,
					alignment: stores.PDF.styles.headingOne.alignment,
					characterSpacing: stores.PDF.styles.headingOne.characterSpacing,
					color: isTheme ? theme['heading-one'] : stores.PDF.styles.headingOne.color,
					decorationColor: stores.PDF.styles.headingOne.decorationColor,
				};
			};

			const headingTwo = () => {
				return {
					font: stores.PDF.styles.headingTwo.font,
					fontSize: stores.PDF.styles.headingTwo.fontSize,
					lineHeight: stores.PDF.styles.headingTwo.lineHeight,
					bold: stores.PDF.styles.headingTwo.bold,
					italics: stores.PDF.styles.headingTwo.italics,
					alignment: stores.PDF.styles.headingTwo.alignment,
					characterSpacing: stores.PDF.styles.headingTwo.characterSpacing,
					color: isTheme ? theme['heading-two'] : stores.PDF.styles.headingTwo.color,
					decorationColor: stores.PDF.styles.headingTwo.decorationColor,
				};
			};

			const headingThree = () => {
				return {
					font: stores.PDF.styles.headingThree.font,
					fontSize: stores.PDF.styles.headingThree.fontSize,
					lineHeight: stores.PDF.styles.headingThree.lineHeight,
					bold: stores.PDF.styles.headingThree.bold,
					italics: stores.PDF.styles.headingThree.italics,
					alignment: stores.PDF.styles.headingThree.alignment,
					characterSpacing: stores.PDF.styles.headingThree.characterSpacing,
					color: isTheme ? theme['heading-three'] : stores.PDF.styles.headingThree.color,
					decorationColor: stores.PDF.styles.headingThree.decorationColor,
				};
			};

			const summaryDefault = () => {
				return {
					margin: [generate().base().pageMargins[0], 30, generate().base().pageMargins[2], 30],
					color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
				};
			};

			const background = () => {
				return {
					type: 'rect',
					x: 0,
					y: 0,
					w: hooks.defines.pdf().base().pageSizeFixes()[stores.PDF.styles.base.pageSize][0],
					h: hooks.defines.pdf().base().pageSizeFixes()[stores.PDF.styles.base.pageSize][1],
					color: isTheme ? theme.page : stores.PDF.styles.base.background.color,
				};
			};

			return {
				paragraph,
				headingOne,
				headingTwo,
				headingThree,
				summaryDefault,
				background,
			};
		};

		return { content, styles, base };
	};

	const doc = (options: Record<any, any>) => {
		const encrypt = () => {
			return stores.PDF.styles.switcher.encryption
				? {
						userPassword: stores.PDF.encryption.userPassword,
						ownerPassword: stores.PDF.encryption.ownerPassword,
						permissions: {
							printing: stores.PDF.permissions.printing,
							modifying: stores.PDF.permissions.modifying,
							copying: stores.PDF.permissions.copying,
							annotating: stores.PDF.permissions.annotating,
							fillingForms: stores.PDF.permissions.fillingForms,
							contentAccessibility: stores.PDF.permissions.contentAccessibility,
							documentAssembly: stores.PDF.permissions.documentAssembly,
						},
				  }
				: {};
		};

		const page = () => {
			return {
				pageSize: generate().base().pageSize,
				pageOrientation: generate().base().pageOrientation,
				pageMargins: {
					left: 0,
					top: generate().base().pageMargins[1],
					right: 0,
					bottom: generate().base().pageMargins[3],
				},
			};
		};

		const info = () => {
			return {
				info: {
					title: stores.PROJECT.name,
					author: stores.PROJECT.creator,
					subject: stores.PROJECT.subject,
					producer: stores.PROJECT.producer,
					keywords: stores.PROJECT.keywords,
				},
			};
		};

		const content = () => {
			return {
				content: generate().content(),
				styles: {
					'heading-three': generate().styles().headingThree(),
					'heading-two': generate().styles().headingTwo(),
					'heading-one': generate().styles().headingOne(),
					'summary-default': generate().styles().summaryDefault(),
					paragraph: generate().styles().paragraph(),
				},
			};
		};

		const footer = () => {
			const text = (currentPage: number, pageCount: number, pageSize: number) => {
				return currentPage >= stores.PDF.styles.base.footer.start
					? stores.PDF.styles.base.footer.textType === 'simple'
						? currentPage.toString()
						: `${currentPage.toString()}/${pageCount}`
					: '';
			};

			const alignment = (currentPage: number, pageCount: number, pageSize: number): any => {
				if (stores.PDF.styles.base.footer.alignment === 'default') {
					return currentPage % 2 ? 'left' : 'right';
				}

				if (stores.PDF.styles.base.footer.alignment === 'center') {
					return 'center';
				}

				if (stores.PDF.styles.base.footer.alignment === 'left') {
					return 'left';
				}

				if (stores.PDF.styles.base.footer.alignment === 'right') {
					return 'right';
				}
			};

			return { document, alignment, text };
		};

		const header = () => {
			stores.PDF.styles.base.header.content;
			const text = (currentPage: number, pageCount: number, pageSize: number) => {
				return currentPage >= stores.PDF.styles.base.header.start
					? stores.PDF.styles.base.header.content
					: '';
			};

			const alignment = (currentPage: number, pageCount: number, pageSize: number): any => {
				if (stores.PDF.styles.base.header.alignment === 'default') {
					return currentPage % 2 ? 'left' : 'right';
				}

				if (stores.PDF.styles.base.header.alignment === 'center') {
					return 'center';
				}

				if (stores.PDF.styles.base.header.alignment === 'left') {
					return 'left';
				}

				if (stores.PDF.styles.base.header.alignment === 'right') {
					return 'right';
				}
			};

			return { alignment, text };
		};

		const addons = () => {
			return {
				background: options.final
					? function (currentPage: number) {
							return currentPage >= 3 &&
								stores.PDF.styles.base.background.main &&
								stores.PDF.styles.switcher.main
								? [
										{
											image: stores.PDF.styles.base.background.main,
											width: hooks.defines.pdf().base().pageSizeFixes()[
												stores.PDF.styles.base.pageSize
											][0],
											height: hooks.defines.pdf().base().pageSizeFixes()[
												stores.PDF.styles.base.pageSize
											][1],
										},
								  ]
								: currentPage <= 1 &&
								  stores.PDF.styles.switcher.cover &&
								  stores.PDF.styles.base.background.data
								? undefined
								: [
										{
											canvas: [generate().styles().background()],
										},
								  ];
					  }
					: undefined,
				footer: stores.PDF.styles.switcher.footer
					? function (currentPage: number, pageCount: number, pageSize: number) {
							return [
								{
									text: footer().text(currentPage, pageCount, pageSize),
									margin: [15, 0],
									fontSize: stores.PDF.styles.base.footer.textSize,
									font: stores.PDF.styles.base.footer.fontFamily,
									alignment: footer().alignment(currentPage, pageCount, pageSize),
									color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
								},
							];
					  }
					: undefined,
				header: stores.PDF.styles.switcher.header
					? function (currentPage: number, pageCount: number, pageSize: any) {
							return [
								{
									text: header().text(currentPage, pageCount, pageSize),
									fontSize: stores.PDF.styles.base.header.textSize,
									font: stores.PDF.styles.base.header.fontFamily,
									decoration: 'underline',
									alignment: header().alignment(currentPage, pageCount, pageSize),
									color: isTheme ? theme.paragraph : stores.PDF.styles.paragraph.color,
								},
							];
					  }
					: undefined,
				pageBreakBefore: function (currentNode: any) {
					if (
						currentNode.id === 'signature' &&
						(currentNode.pageNumbers.length != 1 || currentNode.pageNumbers[0] != currentNode.pages)
					) {
						return true;
					} else if (currentNode.id === 'closingParagraph' && currentNode.pageNumbers.length != 1) {
						return true;
					}
					return false;
				},
			};
		};

		return {
			...encrypt(),
			...page(),
			...info(),
			...content(),
			...addons(),
		};
	};

	const setVfsFonts = () => {
		const _fonts: Array<string> = [];
		const set: Record<string, any> = {};

		_fonts.push(stores.PDF.styles.paragraph.font);
		_fonts.push(stores.PDF.styles.headingOne.font);
		_fonts.push(stores.PDF.styles.headingTwo.font);
		_fonts.push(stores.PDF.styles.headingThree.font);
		_fonts.push(stores.PDF.styles.base.header.fontFamily);
		_fonts.push(stores.PDF.styles.base.footer.fontFamily);
		_fonts.push(stores.PDF.styles.base.summary.fontFamily);

		const unique = _fonts.filter((v, i, a) => a.indexOf(v) === i);

		unique.forEach((s: string) => {
			set[s] = stores.PDF.normalize[s];
		});

		if (stores.PDF.normalize['Roboto']) set['Roboto'] = stores.PDF.normalize['Roboto'];

		pdfMake.addFonts(set);
	};

	const create = async () => {
		setVfsFonts();

		const pdf = pdfMake.createPdf(doc({ final: true }) as any);

		await nextTick;

		pdf
			.download(hooks.project.utils().exportFullName('pdf'))
			.then(() => {
				toast.success(hooks.i18n.t('toast.pdf.create'));
			})
			.catch(() => {
				toast(hooks.i18n.t('toast.generics.error'));
			})
			.finally(() => {
				stores.ABSOLUTE.load = false;
				isLoading.value = false;
			});
	};

	const preview = (input: HTMLElement) => {
		setVfsFonts();

		const generator = pdfMake.createPdf(doc({ final: false }) as any);

		generator
			.getDataUrl()
			.then(
				async (data: any) => {
					const iframe = document.createElement('iframe');

					hooks.emitter.emit('pdf-preview-exists');

					await nextTick;

					iframe.src = data;
					iframe.style.width = '400px';
					iframe.style.height = '500px';
					iframe.style.overflow = 'hidden';

					let child = input?.lastElementChild;
					while (child) {
						input?.removeChild(child);
						child = input?.lastElementChild;
					}

					input?.appendChild(iframe);
				},
				() => {
					toast(hooks.i18n.t('toast.generics.error'));
				}
			)
			.catch(() => {
				toast(hooks.i18n.t('toast.generics.error'));
			})
			.finally(() => {
				stores.ABSOLUTE.load = false;
				isLoading.value = false;
			});
	};

	On.externals().PluginPDFGenerate(emitter, [
		async () => {
			if (hooks.env.isEmptyProject(stores.PROJECT.name)) return;

			toast.info(hooks.i18n.t('toast.generics.load'));

			stores.ABSOLUTE.load = true;
			isLoading.value = true;

			await nextTick;

			hooks.storage.normalize().then(() => {
				create();
			});
		},
		() => {},
	]);

	On.externals().PluginPDFPreview(emitter, [
		async () => {
			if (hooks.env.isEmptyProject(stores.PROJECT.name)) return;

			stores.ABSOLUTE.load = true;
			isLoading.value = true;

			await nextTick;
			await nextTick;

			hooks.storage.normalize().then(() => {
				preview(document.querySelector('#pdf-preview-div') as any);
			});
		},
		() => {},
	]);
};
