<template>
  <div
    class="absolute left-0 top-0 w-full h-screen bg-theme-editor-render-finder-background z-max"
  />
  <div>
    <EditorTutorialContainer
      :data="{ target: 1, position: 'lg:left-80 lg:top-40' }"
      :title="t('editor.tutorial.pages.1.title')"
    >
      <div>{{ t('editor.tutorial.pages.1.description1') }}</div>
      <div>{{ t('editor.tutorial.pages.1.description2') }}</div>
      <template #bottom>
        <div class="flex items-center justify-start w-full">
          <InputBoolean v-model="isValidateTutorial" />
          <p class="px-2 font-raleway">
            {{ t('editor.tutorial.pages.1.alert') }}
          </p>
        </div>
      </template>
    </EditorTutorialContainer>
    <EditorTutorialContainer
      :data="{ target: 2, position: 'lg:left-15 lg:top-40' }"
      :title="t('editor.tutorial.pages.2.title')"
    >
      <div>{{ t('editor.tutorial.pages.2.description1') }}</div>
      <div>{{ t('editor.tutorial.pages.2.description2') }}</div>
      <div>{{ t('editor.tutorial.pages.2.description3') }}</div>
    </EditorTutorialContainer>
    <EditorTutorialContainer
      :data="{ target: 3, position: 'lg:left-80 lg:top-30' }"
      :title="t('editor.tutorial.pages.3.title')"
    >
      <div>{{ t('editor.tutorial.pages.3.description1') }}</div>
      <div>
        <b>{{ t('editor.tutorial.pages.3.high2') }}</b
        >{{ t('editor.tutorial.pages.3.description2') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.3.high3') }}</b
        >{{ t('editor.tutorial.pages.3.description3') }}
      </div>
    </EditorTutorialContainer>
    <EditorTutorialContainer
      :data="{ target: 4, position: 'lg:left-100 lg:top-15' }"
      :title="t('editor.tutorial.pages.4.title')"
    >
      <div>{{ t('editor.tutorial.pages.4.description1') }}</div>
      <div>
        <b>{{ t('editor.tutorial.pages.4.high2') }}</b
        >{{ t('editor.tutorial.pages.4.description2') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.4.high3') }}</b
        >{{ t('editor.tutorial.pages.4.description3') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.4.high4') }}</b
        >{{ t('editor.tutorial.pages.4.description4') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.4.high5') }}</b
        >{{ t('editor.tutorial.pages.4.description5') }}
      </div>
    </EditorTutorialContainer>
    <EditorTutorialContainer
      :data="{ target: 5, position: 'lg:left-10 lg:top-70' }"
      :title="t('editor.tutorial.pages.5.title')"
      emit-on-open="plugin-editor-header-externals-open"
    >
      <div>{{ t('editor.tutorial.pages.5.description1') }}</div>
      <div>
        <b>{{ t('editor.tutorial.pages.5.high2') }}</b
        >{{ t('editor.tutorial.pages.5.description2') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.5.high3') }}</b
        >{{ t('editor.tutorial.pages.5.description3') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.5.high4') }}</b
        >{{ t('editor.tutorial.pages.5.description4') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.5.high5') }}</b
        >{{ t('editor.tutorial.pages.5.description5') }}
      </div>
      <div>
        <b>{{ t('editor.tutorial.pages.6.high6') }}</b
        >{{ t('editor.tutorial.pages.6.description6') }}
      </div>
    </EditorTutorialContainer>
    <EditorTutorialContainer
      :data="{ target: 6, position: 'lg:left-150 lg:top-80' }"
      :title="t('editor.tutorial.pages.final.title')"
      emit-on-open="plugin-editor-header-externals-open"
    >
      <div>{{ t('editor.tutorial.pages.final.description1') }}</div>
    </EditorTutorialContainer>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const isValidateTutorial = ref<boolean>(false)

  watch(isValidateTutorial, (v) => {
    v
      ? localStorage.setItem('tutorial', 'clear')
      : localStorage.removeItem('tutorial')
  })
</script>
