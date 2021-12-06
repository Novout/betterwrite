<template>
  <div
    id="pdf-absolute"
    class="overflow-y-auto wb-text p-4 fixed top-0 left-0 h-screen w-full bg-theme-editor-creative-drafts-background text-theme-editor-creative-drafts-container-list-text z-max"
  >
    <EditorPagesDraftsHeader />
    <h2 class="font-poppins font-bold text-2xl">
      {{ t('editor.bar.chapter.drafts') }}
    </h2>
    <div
      class="flex flex-col md:flex-row h-auto md:h-editor w-full mt-10 bg-theme-editor-creative-drafts-container-background shadow-xl"
    >
      <div
        class="flex border-b md:border-b-0 md:border-solid md:border-r border-theme-editor-creative-drafts-container-borders bg-theme-editor-creative-drafts-container-list-background hover:bg-theme-editor-creative-drafts-container-list-background-hover active:bg-theme-editor-creative-drafts-container-list-background-active overflow-y-auto flex-col w-full md:w-72"
      >
        <div
          class="flex border-b md:border-solid border-theme-editor-creative-drafts-container-borders items-center justify-center p-5 font-poppins h-20 font-semibold text-lg"
        >
          {{ t('editor.drafts.chapters') }}
        </div>
        <Draggable :list="PROJECT.pages" item-key="id">
          <template #item="{ element }">
            <div
              class="text-center shadow cursor-pointer h-24 hover:bg-black-opacity text-lg w-full p-2 font-bold"
              @click="onClickAside(element)"
            >
              <p class="relative top-6 truncate">
                {{ element.title }}
              </p>
            </div>
          </template>
        </Draggable>
      </div>
      <div
        class="flex border-b md:border-b-0 md:border-solid border-r-0 md:border-r border-theme-editor-creative-drafts-container-borders flex-col flex-1 w-auto p-5 overflow-y-auto"
      >
        <h2 class="font-xl font-bold">{{ t('editor.drafts.active') }}</h2>
        <EditorPagesDraftsItem
          :id="{
            draft: page.id,
            active: page.id,
          }"
          :page="actually"
          :active="true"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6H2v16h16v-2H4V6zm18-4H6v16h16V2zm-3 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"
                fill="currentColor"
              ></path>
            </svg>
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
          @info="page = p"
        />
      </div>
      <div
        class="flex flex-col justify-start gap-10 flex-1 w-auto text-lg p-2 overflow-y-auto"
      >
        <h2 class="font-xl text-center pb-5 font-bold text-xl my-10 md:my-0">
          {{ page.title }}
        </h2>
        <div class="flex flex-wrap gap-5 justify-around w-full">
          <EditorPagesDraftsInfo
            :title="t('editor.drafts.statistics.characters')"
            :result="project.utils().getChapterAllCharacters(page)"
          />
          <EditorPagesDraftsInfo
            :title="t('editor.drafts.statistics.letters')"
            :result="project.utils().getChapterLetters(page)"
          />
        </div>
        <div class="flex flex-wrap gap-5 justify-around w-full mt-10">
          <EditorPagesDraftsInfo
            :title="t('editor.drafts.statistics.paragraph')"
            :result="project.utils().getChapterParagraphs(page)"
          />
          <EditorPagesDraftsInfo
            :title="t('editor.drafts.statistics.heading')"
            :result="project.utils().getChapterHeadings(page)"
          />
          <EditorPagesDraftsInfo
            :title="t('editor.drafts.statistics.fixed')"
            :result="project.utils().getChapterFixed(page)"
          />
        </div>
        <div class="flex flex-wrap gap-5 justify-around w-full mt-10">
          <div
            class="px-3 w-full font-bold shadow-lg text-theme-editor-creative-drafts-container-item-text overflow-y-auto bg-theme-editor-creative-drafts-container-item-background h-40 hover:bg-theme-editor-creative-drafts-container-item-background-hover active:bg-theme-editor-creative-drafts-container-item-background-active"
          >
            <h2>{{ t('editor.drafts.statistics.longest') }}</h2>
            <p class="mt-2 w-full text-sm text-justify">
              {{ project.utils().getParagraphLongest(page) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { ContextState } from '@/types/context'
  import useEmitter from '@/use/emitter'
  import { useProject } from '@/use/project'
  import { useCreativeType } from '@/use/type/creative'
  import { ref, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import Draggable from 'vuedraggable'
  import { useStorage } from '@/use/storage/storage'
  import { useContextStore } from '@/store/context'
  import { useNProgress } from '@vueuse/integrations'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const { t } = useI18n()
  const project = useProject()
  const creative = useCreativeType()
  const emitter = useEmitter()
  const storage = useStorage()
  const { isLoading } = useNProgress()

  const page = ref<ContextState>(PROJECT.pages[0])
  const actually = computed(
    () => PROJECT.pages.filter((p) => p.id === page.value.id)[0]
  )

  onMounted(() => {
    PROJECT.updateContext(CONTEXT.$state)

    emitter.on('project-creative-drafts-set-info', (_page: ContextState) => {
      page.value = _page
    })
  })

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
