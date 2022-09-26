<template>
  <div
    id="pdf-absolute"
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="100"
    class="overflow-y-auto bg-rgba-blur font-raleway wb-scroll wb-text p-4 fixed top-0 left-0 h-screen w-full bg-theme-editor-creative-drafts-background text-theme-editor-creative-drafts-container-list-text z-max"
  >
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
          v-for="(element, index) in PROJECT.pages"
          :key="index"
          class="flex items-center justify-center py-10 w-full truncate shadow cursor-pointer hover:bg-black-opacity text-lg w-full font-bold"
          @click="onClickAside(element)"
        >
          {{ element.entities[0]?.raw || element.title }}
        </p>
      </div>
      <div
        class="flex border-b md:border-b-0 md:border-solid border-r-0 md:border-r border-theme-editor-creative-drafts-container-borders flex-col flex-1 w-auto p-5 wb-scroll overflow-y-auto"
      >
        <h2 class="font-xl font-bold">{{ t('editor.drafts.active') }}</h2>
        <EditorPagesDraftsItem
          :id="{
            draft: page.id,
            active: page.id,
          }"
          :page="actually"
          :active="true"
          :main="true"
          @info="page = actually"
        />
        <div class="flex items-center w-full mt-5">
          <p class="font-xl font-bold mr-1">{{ t('editor.drafts.others') }}</p>
          <HeroIcon
            class="wb-icon"
            @click="
              creative.draft().new({
                draft: page.id,
                active: page.id,
              })
            "
          >
            <IconAdd2 class="w-6 h-6" />
          </HeroIcon>
        </div>
        <EditorPagesDraftsItem
          v-for="(p, index) in PROJECT.getCreativeDrafts(page.id)"
          :id="{
            draft: index,
            active: p.id,
          }"
          :key="index"
          :page="p"
          :active="false"
          :main="false"
          @info="page = p"
        />
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="300"
        class="flex flex-col justify-start gap-2 flex-1 w-auto text-lg p-2 overflow-y-auto wb-scroll"
      >
        <h2 class="font-xl text-center pb-5 font-bold text-xl my-10 md:my-0">
          {{ page.title }}
        </h2>
        <EditorEntityDraftsInput
          v-for="(element, index) in CONTEXT.entities"
          :id="`entity-${String(index)}`"
          :key="index"
          :entity="element"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { ContextState } from 'better-write-types'
  import useEmitter from '@/use/emitter'
  import { useProject } from '@/use/project'
  import { useCreativeType } from '@/use/type/creative'
  import { ref, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStorage } from '@/use/storage/storage'
  import { useContextStore } from '@/store/context'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useRaw } from '@/use/raw'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const project = useProject()
  const creative = useCreativeType()
  const emitter = useEmitter()
  const storage = useStorage()
  const raw = useRaw()
  const { isLoading } = useNProgress()

  const page = ref<ContextState>(PROJECT.pages[0])
  const actually = computed(
    () => PROJECT.pages.filter((p: ContextState) => p.id === page.value.id)[0]
  )

  onMounted(async () => {
    PROJECT.updateContext(CONTEXT.$state)

    emitter.on('project-creative-drafts-set-info', (_page: ContextState) => {
      page.value = _page
    })
  })

  const onClose = async () => {
    ABSOLUTE.pages.drafts = false
  }

  const onClickAside = (element: ContextState) => {
    isLoading.value = true

    page.value = element

    storage
      .normalize()
      .then(() => {
        CONTEXT.load(element)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
</script>
