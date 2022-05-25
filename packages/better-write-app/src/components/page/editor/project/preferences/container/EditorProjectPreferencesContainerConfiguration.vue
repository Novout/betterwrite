<template>
  <EditorProjectPreferencesContainerSlot>
    <PreferencesContainerTitle>
      {{ t('editor.aside.configuration.entity.title') }}
    </PreferencesContainerTitle>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.bars') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bars" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.bottomBar') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bottomBar" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.transition') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.transition"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.autosave') }}</p>
      <InputBoolean v-model="EDITOR.configuration.autosave" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.blocked') }}</p>
      <InputBoolean v-model="EDITOR.configuration.blocked" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>
        {{
          t(
            'editor.aside.configuration.entity.insertEntityInParagraphBreakLine'
          )
        }}
      </p>
      <InputBoolean
        v-model="EDITOR.configuration.entity.insertEntityInParagraphBreakLine"
        :specific="true"
      />
    </div>
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useI18n } from 'vue-i18n'

  const EDITOR = useEditorStore()

  const { t } = useI18n()
</script>
