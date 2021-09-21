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
        rounded-none
        dark:border-none
        text-black
        dark:text-gray-500 dark:hover:text-gray-200
        bg-gray-200
        dark:bg-gray-800
      "
    >
      <slot class="h-5 w-5" name="icon" />
      <span class="text-sm hidden md:inline">{{ props.title }}</span>
      <HeroIcon
        :class="open ? 'transform rotate-180' : ''"
        class="w-3 h-3 hidden md:inline"
      >
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
