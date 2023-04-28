<template>
  <Modal @close="onClose">
    <div class="flex items-center justify-center w-full h-screen bg-modal">
      <div
        ref="main"
        class="left-0 top-0 p-5 flex z-max flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text wb-scroll overflow-y-auto rounded shadow-2xl wb-scroll"
      >
        <EditorAbsoluteHeader :title="t('editor.new.title')" @close="onClose" />
        <p class="my-10 text-lg font-raleway text-center">
          {{ t('editor.new.description1')
          }}<b>{{ t('editor.new.description2') }}</b
          >{{ t('editor.new.description3') }}
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: -30 }"
          :enter="{
            opacity: 1,
            y: 0,
          }"
          :delay="200"
          class="mt-2 flex-1 flex flex-wrap flex-col lg:flex-row gap-10 items-center justify-between w-full"
        >
          <EditorProjectNewType>
            <div class="flex gap-2 items-center">
              <div>
                <IconPaper class="w-8 h-8" />
              </div>
              <h2 class="text-xl font-bold">
                {{ t('editor.new.blank.title') }}
              </h2>
            </div>
            <p class="text-lg text-center">
              {{ t('editor.new.blank.description') }}
            </p>
            <EditorProjectNewList
              :list="['single', 'export', 'tools', 'statistics']"
            />
            <Button @click="project.external().new('blank')">{{
              t('editor.new.blank.button')
            }}</Button>
          </EditorProjectNewType>
          <EditorProjectNewType>
            <div class="flex gap-2 items-center">
              <div>
                <IconBook class="w-8 h-8" />
              </div>
              <h2 class="text-xl font-bold">
                {{ t('editor.new.creative.title') }}
              </h2>
            </div>
            <p class="text-lg text-center">
              {{ t('editor.new.creative.description') }}
            </p>
            <EditorProjectNewList
              :list="[
                'multiple',
                'annotation',
                'export',
                'tools',
                'statistics',
              ]"
            />
            <Button @click="project.external().new('creative')">{{
              t('editor.new.creative.button')
            }}</Button>
          </EditorProjectNewType>
          <EditorProjectNewType>
            <div class="flex gap-2 items-center">
              <div>
                <IconAnnotation class="w-8 h-8" />
              </div>
              <h2 class="text-xl font-bold">
                {{ t('editor.new.annotations.title') }}
              </h2>
            </div>
            <p class="text-lg text-center">
              {{ t('editor.new.annotations.description') }}
            </p>
            <EditorProjectNewList :list="['annotation', 'tools']" />
            <Button @click="project.external().new('only-annotations')">{{
              t('editor.new.annotations.button')
            }}</Button>
          </EditorProjectNewType>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useContextStore } from '@/store/context'
  import { useProject } from '@/use/project'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()

  const { t } = useI18n()
  const project = useProject()

  const onClose = () => {
    if (CONTEXT.entities.length > 0) ABSOLUTE.project.new = false
  }
</script>
