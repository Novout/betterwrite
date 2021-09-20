<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="
        flex
        justify-between
        items-center
        w-full
        px-4
        py-2
        font-medium
        text-left
        dark:border-none
        text-black
        dark:text-gray-500 dark:hover:text-gray-200
        bg-gray-200
        dark:bg-gray-800
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="text-sm">{{ props.title }}</span>
      <HeroIcon :class="open ? 'transform rotate-180' : ''" class="w-3 h-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </HeroIcon>
    </DisclosureButton>
    <DisclosurePanel
      class="flex flex-col w-full px-2 pt-2 pb-2 items-center justify-between"
    >
      <slot />
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String,
  })
</script>
