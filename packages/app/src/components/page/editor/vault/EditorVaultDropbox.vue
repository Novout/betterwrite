<template>
  <div v-if="!AUTH.account.dropboxAccessToken" class="flex rounded shadow px-2 py-1 mb-5 cursor-pointer bg-theme-background-2 justify-between items-center w-full wb-text" @click.prevent.stop="dropbox.connect">
    <button>
      <IconDropbox class="w-7 h-7" />
    </button>
    <p class="font-poppins font-bold">Conectar</p>
  </div>
  <div v-else class="flex px-2 py-1 mb-5 cursor-pointer bg-theme-background-2 justify-between items-center w-full wb-text" @click.prevent.stop="dropbox.load">
    <button>
      <IconDropbox class="w-7 h-7" />
    </button>
    <p class="font-poppins font-bold">Carregar</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useDropbox } from '@/use/storage/dropbox';

const AUTH = useAuthStore()

const dropbox = useDropbox()
</script>