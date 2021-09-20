<template>
  <section class="wb-base flex flex-col md:flex-row">
    <aside
      class="
        fixed
        md:relative
        h-screen
        w-20
        md:w-60
        bg-white
        dark:bg-gray-700
        border-r border-black
        dark:border-gray-700
      "
    >
      <AsideBar />
      <AsideGraph />
    </aside>
    <main class="flex-1">
      <EditorBase />
    </main>
  </section>
</template>

<script lang="ts" setup></script>
