<template>
  <FullModal @close="onClose">
    <EditorAbsoluteHeader
      :title="t('editor.bar.chapter.drafts')"
      @close="onClose"
    />
    <div
      class="flex flex-col md:flex-row h-auto md:h-editor w-full mt-10 bg-theme-editor-creative-drafts-container-background shadow-xl"
    >
      <div
        class="flex flex-col wb-scroll overflow-y-auto bg-theme-editor-creative-drafts-container-list-background hover:bg-theme-editor-creative-drafts-container-list-background-hover active:bg-theme-editor-creative-drafts-container-list-background-active w-full md:w-72"
      >
        <h2
          class="flex items-center justify-center p-5 font-poppins h-20 font-semibold text-lg"
        >
          {{ t('editor.drafts.chapters') }}
        </h2>
        <p
          v-for="(page, index) in PROJECT.chapters"
          :key="index"
          class="flex items-center justify-center py-10 w-full truncate shadow cursor-pointer hover:bg-black-opacity text-lg w-full font-bold"
          @click="CONTEXT.load(page)"
        >
          {{ page.entities[0]?.raw || page.title }}
        </p>
      </div>
      <div
        class="flex border-b md:border-b-0 md:border-solid border-r-0 md:border-r border-theme-editor-creative-drafts-container-borders flex-col flex-1 w-auto p-5 wb-scroll overflow-y-auto"
      >
        <h2 class="font-xl font-bold">{{ t('editor.drafts.active') }}</h2>
        <EditorPagesDraftsItem :page="CONTEXT.$state" :main="true" />
        <div class="flex items-center w-full mt-5">
          <p class="font-xl font-bold mr-1">{{ t('editor.drafts.others') }}</p>
          <HeroIcon class="wb-icon" @click="creative.draft().new()">
            <IconAdd2 class="w-6 h-6" />
          </HeroIcon>
        </div>
        <EditorPagesDraftsItem
          v-for="(p, index) in PROJECT.getActuallyDrafts"
          :key="index"
          :page="p"
          :main="false"
        />
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="300"
        class="flex flex-col justify-start gap-2 flex-1 w-auto text-lg p-2 overflow-y-auto wb-scroll"
      >
        <div class="my-10 md:my-4">
          <h2 class="font-xl truncate text-center pb-5 font-bold text-xl">
            {{ CONTEXT.title }}
          </h2>
        </div>
        <EditorEntityDraftsInput
          v-for="(element, index) in CONTEXT.entities"
          :id="`entity-${String(index)}`"
          :key="index"
          :entity="element"
        />
      </div>
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useCreativeType } from '@/use/type/creative'
  import { useI18n } from 'vue-i18n'
  import { useContextStore } from '@/store/context'
  import { useAbsoluteStore } from '@/store/absolute'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const creative = useCreativeType()

  const onClose = async () => {
    ABSOLUTE.pages.drafts = false
  }
</script>
