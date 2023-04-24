<template>
  <Listbox v-model="cmp" class="w-auto">
    <div>
      <ListboxButton
        class="w-full py-2 pl-3 pr-10 text-left bg-theme-background-4 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      >
        <span :class="[aside ? 'w-12' : '']" class="block truncate">{{
          cmp
        }}</span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="[min ? 'max-h-28' : 'max-h-52']"
          class="fixed max-w-60 overflow-y-auto py-1 mt-1 text-base bg-theme-background-4 rounded-md shadow-lg wb-scroll ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-max"
        >
          <ListboxOption
            v-for="(it, index) in props.arr"
            v-slot="{ selected }"
            :key="index"
            :value="it"
            as="template"
          >
            <li
              :class="[
                aside ? 'w-24' : '',
                'cursor-pointer hover:bg-theme-background-2 select-none relative py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-bold' : 'font-normal',
                  aside ? 'w-24' : '',
                  'block truncate',
                ]"
                :style="{ fontFamily: font ? it as string : '', width: widthItems ? `${widthItems}px` : '' }"
                >{{ it }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 truncate w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
    },
    arr: {
      required: false,
      type: Array,
    },
    font: {
      required: false,
      type: Boolean,
      default: false,
    },
    aside: {
      required: false,
      type: Boolean,
      default: false,
    },
    min: {
      required: false,
      type: Boolean,
      default: false,
    },
    widthItems: {
      required: false,
      type: Number,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
