import { ref, defineComponent, h } from 'vue-demi';

export const EditorRow = defineComponent({
	name: 'EditorRow',
	setup(props, ctx) {
		const value = ref(640);

		return () =>
			h(
				'div',
				{
					class: 'counter-number',
				},
				h('div', 'test')
			);
	},
});
