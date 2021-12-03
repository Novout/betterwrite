<template>
  <!-- DROPBOX -->
  <EditorHeaderButton>
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--grommet-icons"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M7.06 1L0 5.61l4.882 3.908L12 5.123L7.06 1zM0 13.428l7.06 4.61L12 13.914L4.882 9.52L0 13.43zm12 .486l4.94 4.124l7.06-4.61l-4.882-3.91L12 13.914zM24 5.61L16.94 1L12 5.124l7.118 4.395L24 5.609zM12.014 14.8L7.06 18.913l-2.12-1.385v1.552l7.074 4.243l7.075-4.243v-1.552l-2.12 1.385l-4.955-4.112z"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.dropbox.connect')"
        shortcut=""
        @action="dropbox.connect"
      />
      <EditorHeaderItem
        v-if="AUTH.dropbox.accessToken"
        :text="t('editor.bar.dropbox.load')"
        shortcut=""
        @action="dropbox.load"
      />
      <EditorHeaderItem
        v-if="AUTH.dropbox.accessToken"
        :text="t('editor.bar.dropbox.save')"
        shortcut=""
        @action="dropbox.save"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useDropbox } from '@/use/storage/dropbox'
  import { useAuthStore } from '@/store/auth'

  const AUTH = useAuthStore()

  const dropbox = useDropbox()
  const { t } = useI18n()
</script>
