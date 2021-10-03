<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.dropbox.load')"
    :icon="true"
    :beta="true"
    @click.prevent="onClick"
  >
    <HeroIcon class="mr-2">
      <svg
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 43 40"
        version="1.1"
        height="20px"
      >
        <path
          d="m12.5 0l-12.5 8.1 8.7 7 12.5-7.8-8.7-7.3zm-12.5 21.9l12.5 8.2 8.7-7.3-12.5-7.7-8.7 6.8zm21.2 0.9l8.8 7.3 12.4-8.1-8.6-6.9-12.6 7.7zm21.2-14.7l-12.4-8.1-8.8 7.3 12.6 7.8 8.6-7zm-21.1 16.3l-8.8 7.3-3.7-2.5v2.8l12.5 7.5 12.5-7.5v-2.8l-3.8 2.5-8.7-7.3z"
          fill="#007EE5"
        />
      </svg>
    </HeroIcon>
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import {
    Dropbox as DBX,
    DropboxResponse,
    DropboxResponseError,
  } from 'dropbox'
  import { useStore } from 'vuex'
  import { useDropbox } from '@/use/storage/dropbox'
  import { useEnv } from '@/use/env'

  const { t } = useI18n()
  const store = useStore()

  const onClick = async () => {
    if (!store.state.auth.dropbox.accessToken) {
      return
    }

    const options = {
      success: function (files: Array<any>) {
        const file = files[0]

        const dbx = new DBX({
          accessToken: store.state.auth.dropbox.accessToken,
        })
        dbx
          .filesDownload({ path: file.id })
          .then(async (data: DropboxResponse<any>) => {
            const context = JSON.parse(await data.result.fileBlob.text())

            useDropbox(store).onLoadProject(context)
          })
          .catch((err: DropboxResponseError<any>) => {
            console.error(err)
          })
      },

      cancel: function () {},
      linkType: 'preview',
      multiselect: false,
      extensions: ['.bw'],
      folderselect: false,
    }

    Dropbox.choose(options)
  }
</script>
