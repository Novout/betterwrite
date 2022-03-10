<template>
  <!-- Create -->
  <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 384 512"
      >
        <path
          d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.pdf.configuration')"
        @action="ABSOLUTE.pdf.configuration = true"
      />
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.pdf.preview')"
        @action="ABSOLUTE.pdf.preview = true"
      >
        <template #icon>
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
              d="M22 2H6v16h16V2zm-10.5 9H9v2H7.5V7h4v4zm5 .5c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v16h16v-2H4V6zm10 5.5h1v-3h-1v3z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        :text="t('editor.bar.pdf.generate')"
        @action="plugin.emit('plugin-pdf-generate')"
      >
        <template #icon>
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
              d="M22 2H6v16h16V2zm-10.5 9H9v2H7.5V7h4v4zm5 .5c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v16h16v-2H4V6zm10 5.5h1v-3h-1v3z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
      </EditorHeaderItem>
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.docx.generate')"
        @action="plugin.emit('plugin-docx-generate')"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="ml-0.5"
            aria-hidden="true"
            role="img"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 512 512"
          >
            <path
              d="M488.877 52.447H302.306V5.92h-34.779L0 52.563v406.99l265.957 46.527h36.349v-46.353h174.59c9.887-.465 20.879.291 29.37-5.757c6.804-10.41 5.06-23.438 5.641-35.186V75.012c1.221-13.26-9.77-23.903-23.03-22.565zm-294.862 282.59c-9.712 5.06-24.252-.233-35.767.581c-7.735-38.5-16.75-76.768-23.67-115.443c-6.805 37.57-15.645 74.79-23.438 112.128c-11.166-.581-22.39-1.28-33.615-2.035c-9.655-51.18-20.995-102.01-30.01-153.305c9.945-.465 19.948-.872 29.893-1.221c5.99 37.047 12.795 73.919 18.03 111.024c8.2-38.036 16.574-76.071 24.717-114.106c11.05-.64 22.1-1.105 33.15-1.687c7.735 39.257 15.644 78.455 24.019 117.537c6.572-40.361 13.841-80.607 20.879-120.91c11.631-.407 23.263-1.047 34.836-1.745c-13.143 56.355-24.659 113.176-39.024 169.182zm290.212 97.069H302.306v-36.527h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-29.08h151.21v-23.262h-151.21v-29.08h151.21V215.29h-151.21V186.21h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-30.71h181.921v352.21z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
      </EditorHeaderItem>
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { usePlugin } from 'better-write-plugin-core'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const env = useEnv()
  const plugin = usePlugin()
  const { t } = useI18n()
</script>
