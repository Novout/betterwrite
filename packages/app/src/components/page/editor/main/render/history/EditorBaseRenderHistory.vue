<template>
  <section v-if="HISTORY.bar.length !== 0 && PROJECT.type !== 'blank'" class="flex z-50 wb-text items-center bg-theme-background-opacity-1 justify-between w-full">
    <button v-for="(item, index) in HISTORY.bar" :key="index" :class="[HISTORY.barActive === item.id ? 'bg-theme-background-2' : 'hover:bg-theme-background-opacity-1']" class="flex-1 font-bold flex justify-around items-center font-raleway min-w-12 h-10 md:(h-9)" @click.prevent.stop="history.onLoad(item)">
      <div class="flex gap-2 truncate pl-2">
        <CustomIcon v-if="item.customIcon" :icon="item.customIcon" />
        <p class="truncate">{{ item.name || item.id }}</p>
      </div>
      <button @click.prevent.stop="history.onDeleteBar(item)">
        <IconClose class="w-6 h-6 wb-icon"/>
      </button>
    </button>
    <button class="wb-icon ml-2" @click.prevent.stop="history.onCloseAll">
      <IconCloseAll class="w-6 h-6" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/store/history';
import { useProjectStore } from '@/store/project';
import { useHistory } from '@/use/history'

const HISTORY = useHistoryStore()
const PROJECT = useProjectStore()

const history = useHistory()
</script>