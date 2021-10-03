<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.dropbox.save')"
    :icon="true"
    :beta="true"
    :enable="true"
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
  import { useStore } from 'vuex'
  import { useI18n } from 'vue-i18n'
  import { Dropbox } from 'dropbox'

  const store = useStore()
  const { t } = useI18n()

  const onClick = () => {
    if (!store.state.auth.dropbox.accessToken) {
      window.open(
        `https://www.dropbox.com/oauth2/authorize?client_id=${useEnv().dropboxKey()}&response_type=token&redirect_uri=http://localhost:3000/better-write/&scope=account_info.read files.metadata.write files.metadata.read files.content.write files.content.read`,
        '_self'
      )
      return
    }

    const obj = {
      project: store.state.project,
      editor: store.state.editor,
      logger: store.state.logger,
      pdf: {
        styles: store.state.pdf.styles,
        fonts: [],
        normalize: {},
      },
    }

    const dbx = new Dropbox({
      accessToken: store.state.auth.dropbox.accessToken,
    })

    dbx
      .filesUpload({
        path: `/${store.state.project.name}.bw`,
        contents: JSON.stringify(obj),
      })
      .catch((res: any) => {
        console.error(res)
      })
      .then((res: any) => {
        // console.log(res)
      })

    /*
    Dropbox.save(
      window.URL.createObjectURL(blob),
      `${store.state.project.name}.bw`,
      options
    )
    */
  }
</script>
