<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton>
        <slot name="icon"></slot>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="
          absolute
          right-0
          w-56
          mt-2
          origin-top-right
          bg-white
          divide-y divide-gray-100
          rounded-md
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
      >
        <div class="px-1 py-1">
          <slot></slot>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex rounded-md items-center w-full px-2 py-2 text-sm',
              ]"
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex rounded-md items-center w-full px-2 py-2 text-sm',
              ]"
            >
              Duplicate
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
