<template>
  <EditorProjectPreferencesContainerSlot>
    <div class="flex flex-col gap-2">
      <PreferencesContainerTitle>{{
        t('editor.preferences.configuration.theme.title')
      }}</PreferencesContainerTitle>
      <p class="font-bold text-sm font-raleway mt-2">
        {{ t('editor.preferences.configuration.theme.define') }}
      </p>
      <div>
        <div
          v-for="([theme, logo], index) in Themes()"
          :key="index"
          class="flex items-center w-full gap-2 cursor-pointer py-1"
          :class="[
            EDITOR.configuration.theme === theme
              ? 'bg-theme-background-opacity-1'
              : '',
            EDITOR.styles.base.backgroundData
              ? 'pointer-events-none opacity-40'
              : '',
          ]"
          @click.prevent.stop="onSwitchTheme(theme)"
        >
          <img width="15" :src="logo" :alt="theme" />
          <p class="truncate">
            {{ theme.replaceAll('BetterWrite -', '') }}
          </p>
        </div>
      </div>
      <p class="font-bold text-sm font-raleway mt-2">
        {{ t('editor.preferences.configuration.theme.or') }}
      </p>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.preferences.configuration.editor.background.image') }}
        </p>
        <InputFileImage
          accept=".png, .gif, .jpg, .jpeg"
          :src="EDITOR.styles.base.backgroundData"
          @load="onCoverImageLoad"
          @exclude="onDeleteCoverImage"
        />
        <div
          v-if="EDITOR.styles.base.backgroundData"
          class="flex flex-col gap-2"
        >
          <div class="wb-preferences">
            <p class="text-sm">
              {{
                t('editor.preferences.configuration.editor.background.cover')
              }}
            </p>
            <InputBoolean
              v-model="EDITOR.styles.base.backgroundCoverAttribute"
            />
          </div>
          <div class="wb-preferences">
            <p class="text-sm">
              {{
                t(
                  'editor.preferences.configuration.editor.background.imageBlur'
                )
              }}
            </p>
            <InputBoolean v-model="EDITOR.styles.base.backgroundBlur" />
          </div>
          <div class="wb-preferences">
            <p class="text-sm">
              {{
                t(
                  'editor.preferences.configuration.editor.background.imageGrayscale'
                )
              }}
            </p>
            <InputBoolean v-model="EDITOR.styles.base.backgroundGrayscale" />
          </div>
          <div class="wb-preferences">
            <p class="text-sm">
              {{
                t(
                  'editor.preferences.configuration.editor.background.imageSaturate'
                )
              }}
            </p>
            <InputBoolean v-model="EDITOR.styles.base.backgroundSaturate" />
          </div>
          <div class="wb-preferences">
            <p class="text-sm">
              {{
                t(
                  'editor.preferences.configuration.editor.background.imageSepia'
                )
              }}
            </p>
            <InputBoolean v-model="EDITOR.styles.base.backgroundSepia" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <p class="font-bold text-lg mt-5">
          {{ t('editor.preferences.configuration.editor.text') }}
        </p>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontFamily') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.text.fontFamily"
            :specific="true"
            :arr="fonts"
            :font="true"
            :width-items="90"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontWeight') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.text.fontWeight"
            :specific="true"
            :arr="[200, 300, 400, 500, 700, 900]"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontSize') }}
          </p>
          <InputNumber
            v-model="EDITOR.styles.text.fontSize"
            :step="2"
            :min="8"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-bold text-lg mt-5">
          {{ t('editor.preferences.configuration.editor.heading') }}
        </p>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontFamily') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.heading.fontFamily"
            :specific="true"
            :arr="fonts"
            :font="true"
            :width-items="90"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontWeight') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.heading.fontWeight"
            :specific="true"
            :arr="[200, 300, 400, 500, 700, 900]"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-bold text-lg mt-5">
          {{ t('editor.preferences.configuration.editor.header') }}
        </p>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontFamily') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.header.fontFamily"
            :specific="true"
            :arr="fonts"
            :font="true"
            :width-items="90"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontWeight') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.header.fontWeight"
            :specific="true"
            :arr="[200, 300, 400, 500, 700, 900]"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontSize') }}
          </p>
          <InputNumber
            v-model="EDITOR.styles.header.fontSize"
            :step="2"
            :min="8"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-bold text-lg mt-5">
          {{ t('editor.preferences.configuration.editor.graph') }}
        </p>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontFamily') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.graph.fontFamily"
            :specific="true"
            :arr="fonts"
            :font="true"
            :width-items="90"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontWeight') }}
          </p>
          <InputSelect
            v-model="EDITOR.styles.graph.fontWeight"
            :specific="true"
            :arr="[200, 300, 400, 500, 700, 900]"
          />
        </div>
        <div class="wb-preferences">
          <p class="text-sm">
            {{ t('editor.preferences.configuration.editor.fontSize') }}
          </p>
          <InputNumber
            v-model="EDITOR.styles.graph.fontSize"
            :step="2"
            :min="8"
          />
        </div>
      </div>
    </div>
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { Themes } from 'better-write-plugin-theme'
  import { BetterWriteThemes } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { nextTick, computed, watch } from 'vue'
  import { usePlugin } from 'better-write-plugin-core'
  import { useStorage } from '@/use/storage/storage'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { useI18n } from 'vue-i18n'
  import { usePDFStore } from '@/store/pdf'
  import { useToast } from 'vue-toastification'

  const EDITOR = useEditorStore()
  const PDF = usePDFStore()

  const { isLoading } = useNProgress()
  const plugin = usePlugin()
  const storage = useStorage()
  const { t } = useI18n()
  const toast = useToast()

  const fonts = computed(() =>
    EDITOR.styles.googleFontsInjection
      ? ['Poppins', 'Raleway', ...PDF.fonts]
      : ['Poppins', 'Raleway']
  )

  const onSwitchTheme = async (theme: BetterWriteThemes) => {
    EDITOR.configuration.theme = theme

    isLoading.value = true

    await nextTick

    await storage.normalize()

    plugin.emit('plugin-theme-set')

    isLoading.value = false
  }

  watch(
    computed(() => EDITOR.styles.googleFontsInjection),
    (b) => {
      if (!b) {
        EDITOR.styles.heading.fontFamily = 'Poppins'
        EDITOR.styles.text.fontFamily = 'Raleway'
      }
    }
  )

  const onCoverImageLoad = async (e: any) => {
    EDITOR.styles.base.backgroundData = e

    await nextTick

    toast.success(t('toast.generics.successAdded'))

    plugin.emit('plugin-theme-set', 'BetterWrite - Custom')
  }

  const onDeleteCoverImage = async () => {
    EDITOR.styles.base.backgroundData = ''

    await nextTick

    toast.success(t('toast.generics.successRemoved'))

    plugin.emit('plugin-theme-set')
  }
</script>
