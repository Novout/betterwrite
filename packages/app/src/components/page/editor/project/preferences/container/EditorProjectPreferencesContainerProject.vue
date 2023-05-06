<template>
  <EditorProjectPreferencesContainerSlot>
    <section class="flex gap-2 mb-5">
      <PreferencesContainerTitle>
        {{ t('editor.project.configuration.title') }}
      </PreferencesContainerTitle>
      <TooltipIcon :tooltip="t('editor.project.configuration.tooltip.base')" />
    </section>
    <div class="wb-configuration">
      <section class="flex gap-2">
        <p class="text-sm">{{ t('editor.project.configuration.creator') }}</p>
        <TooltipIcon
          :tooltip="t('editor.project.configuration.tooltip.creator')"
        />
      </section>
      <InputText
        v-model="PROJECT.creator"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <section class="flex gap-2">
        <p class="text-sm">{{ t('editor.project.configuration.name') }}</p>
        <TooltipIcon
          :tooltip="t('editor.project.configuration.tooltip.name')"
        />
      </section>
      <InputText
        v-model="PROJECT.nameRaw"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <section class="flex gap-2">
        <p class="text-sm">{{ t('editor.project.configuration.subject') }}</p>
        <TooltipIcon
          :tooltip="t('editor.project.configuration.tooltip.subject')"
        />
      </section>
      <InputTextArea
        v-model="PROJECT.subject"
        class="wb-configuration-input-text overflow-x-hidden resize-none"
        rows="5"
      />
    </div>
    <div class="wb-configuration">
      <section class="flex gap-2">
        <p class="text-sm">{{ t('editor.project.configuration.keywords') }}</p>
        <TooltipIcon
          :tooltip="t('editor.project.configuration.tooltip.keywords')"
        />
      </section>
      <InputText
        v-model="PROJECT.keywords"
        class="wb-configuration-input-text"
      />
    </div>
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useProjectStore } from '@/store/project'
  import { watch, computed } from 'vue'
  import { useUtils } from '@/use/utils'

  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const text = useUtils().text()

  const name = computed(() => PROJECT.nameRaw)

  watch(name, () => {
    PROJECT.name = text.kebab(PROJECT.nameRaw)
  })
</script>
