<template>
  <section v-if="HISTORY.bar.length !== 0" class="flex z-50 wb-text items-center bg-theme-background-opacity-1 justify-between w-full">
    <button v-for="(item, index) in HISTORY.bar" :key="index" :class="[HISTORY.barActive === item.id ? 'bg-theme-background-2' : 'hover:bg-theme-background-opacity-1']" class="flex-1 font-bold flex justify-around items-center font-raleway min-w-12 h-10 md:(h-9)" @click.prevent.stop="onLoad(item)">
      <div class="flex gap-2 truncate pl-2">
        <CustomIcon v-if="item.customIcon" :icon="item.customIcon" />
        <p class="truncate">{{ item.name || item.id }}</p>
      </div>
      <button @click.prevent.stop="onDeleteBar(item)">
        <IconClose class="w-6 h-6 wb-icon"/>
      </button>
    </button>
    <button class="wb-icon ml-2" @click.prevent.stop="onCloseAll">
      <IconCloseAll class="w-6 h-6" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/store/history';
import { usePlugin } from 'better-write-plugin-core';
import { useSchemas } from '@/use/schemas'
import { HistoryStateBarItem } from 'better-write-types';
import { useGraph } from '@/use/graph';
import { useProjectStore } from '@/store/project';
import { useStorage } from '@/use/storage/storage';

const HISTORY = useHistoryStore()
const PROJECT = useProjectStore()

const plugin = usePlugin()
const schemas = useSchemas()
const graph = useGraph()
const storage = useStorage()

const onLoad = async (item?: HistoryStateBarItem) => {
  await storage.normalize()

  if(!item) item = HISTORY.bar.shift()

  if(!item) return

  if(item.type === 'annotations') {
    const target = schemas.findFile(item.id)

    if(!target) {
      HISTORY.deleteBar(item)
      
      return
    }

    plugin.emit('plugin-schemas-start', target)
    HISTORY.barActive = target.id

    return
  }

  const page = PROJECT.chapters.find(chapter => chapter.id === item?.id)

  if(!page) {
    HISTORY.deleteBar(item)
      
    return
  }

  HISTORY.barActive = item.id
  graph.load(item.id as number, page, page.entities[0], item.scrollHeight)
}

const onDeleteBar = (item: HistoryStateBarItem) => {
  HISTORY.deleteBar(item)

  onLoad()
}

const onCloseAll = () => {
  HISTORY.bar = []
  HISTORY.barActive = undefined
}
</script>