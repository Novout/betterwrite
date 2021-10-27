<template>
  <header
    class="
      flex
      py-1
      justify-start
      items-center
      w-full
      bg-transparent
      drag
      z-50
    "
  >
    <div>
      <HeroIcon
        v-if="PROJECT.name !== env.projectEmpty()"
        class="
          relative
          justify-center
          items-center
          z-aside-open
          wb-icon
          rounded-br
          no-drag
          mr-7
        "
        @click="ABSOLUTE.aside = !ABSOLUTE.aside"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </HeroIcon>
    </div>
    <div class="flex flex-row items-center">
      <!-- Project -->
      <EditorHeaderButton>
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ri"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 9h6a1 1 0 0 0 1-1V2h10.002c.551 0 .998.455.998.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V9zm0-2l5-4.997V7H3z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
        <template #bar>
          <EditorHeaderItem
            :text="t('editor.bar.project.new')"
            shortcut="CTRL + Shift + Q"
            @action="ABSOLUTE.project.new = true"
          />
          <EditorHeaderItem
            v-if="PROJECT.name !== env.projectEmpty()"
            :text="t('editor.bar.project.configuration')"
            shortcut="CTRL + Alt + Q"
            @action="ABSOLUTE.project.configuration = true"
          />
          <EditorHeaderItem
            :divider="true"
            :text="t('editor.bar.project.load')"
            shortcut="CTRL + Shift + Q"
            @action="local.onLoadProject"
          />
          <EditorHeaderItem
            v-if="PROJECT.name !== env.projectEmpty()"
            :text="t('editor.bar.project.save')"
            shortcut="CTRL + Alt + Q"
            @action="local.onSaveProject"
          />
        </template>
      </EditorHeaderButton>
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
      <!-- PDF -->
      <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ic"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
        <template #bar>
          <EditorHeaderItem
            :text="t('editor.bar.pdf.configuration')"
            shortcut="CTRL + G"
            @action="pdf.external().onConfigurationPDF()"
          />
          <EditorHeaderItem
            :text="t('editor.bar.pdf.preview')"
            shortcut="CTRL + Shift + G"
            @action="ABSOLUTE.pdf.preview = true"
          />
          <EditorHeaderItem
            :text="t('editor.bar.pdf.generate')"
            shortcut="CTRL + Alt + G"
            @action="pdf.external().onGeneratePDF()"
          />
        </template>
      </EditorHeaderButton>
      <!-- Chapters -->
      <div
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
        class="px-4"
      ></div>
      <EditorHeaderButton
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ic"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm.59 4.59l4.83 4.83c.37.37.58.88.58 1.41V21c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h6.17c.53 0 1.04.21 1.42.59zM15 12h4.5L14 6.5V11c0 .55.45 1 1 1z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
        <template #bar>
          <EditorHeaderItem
            :text="t('editor.bar.chapter.new')"
            shortcut="CTRL + Q"
            @action="page.onCreatePage"
          />
          <EditorHeaderItem
            :text="t('editor.bar.chapter.delete')"
            shortcut="CTRL + Alt + D"
            @action="page.onDeletePage"
          />
          <EditorHeaderItem
            :text="t('editor.bar.chapter.down')"
            shortcut=""
            @action="page.onDownPage"
          />
          <EditorHeaderItem
            :text="t('editor.bar.chapter.up')"
            shortcut=""
            @action="page.onUpPage"
          />
        </template>
      </EditorHeaderButton>
      <!-- Logger -->
      <EditorHeaderButton
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--mdi"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3l3-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11"
              fill="currentColor"
            ></path>
          </svg>
        </template>
        <template #bar>
          <EditorHeaderItem
            :text="t('editor.bar.assistants.actions')"
            shortcut="CTRL + L"
            @action="ABSOLUTE.logger = true"
          />
          <EditorHeaderItem
            :text="t('editor.bar.assistants.finder')"
            shortcut="CTRL + F"
            @action="ABSOLUTE.shortcuts.finder = true"
          />
          <EditorHeaderItem
            :text="t('editor.bar.assistants.swapper')"
            shortcut="CTRL + H"
            @action="ABSOLUTE.shortcuts.switcher = true"
          />
        </template>
      </EditorHeaderButton>
    </div>
    <div class="flex-1 w-full"></div>
    <div
      v-if="PROJECT.name !== env.projectEmpty()"
      class="wb-icon no-drag cursor-pointer mb-2"
      @click.prevent.stop="editor.fullScreen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { usePage } from '@/use/page'
  import { useEditor } from '@/use/editor'
  import { useProject } from '@/use/project'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useContextStore } from '@/store/context'
  import { useEnv } from '@/use/env'
  import { usePDF } from '@/use/pdf'
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useDropbox } from '@/use/storage/dropbox'
  import { useAuthStore } from '@/store/auth'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const AUTH = useAuthStore()

  const page = usePage()
  const project = useProject()
  const editor = useEditor()
  const env = useEnv()
  const pdf = usePDF()
  const local = useLocalStorage()
  const dropbox = useDropbox()
  const { t } = useI18n()

  const onFinder = (e: MouseEvent) => {
    ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
  }

  const onSwitcher = (e: MouseEvent) => {
    ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher
  }
</script>
