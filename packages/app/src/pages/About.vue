<template>
  <img
    class="absolute shadow-xl left-10 sm:left-40 lg:left-100 top-50 w-40 md:w-60 z-0 opacity-10 pointer-events-none"
    alt="Better Write Logo"
    src="/logo.png"
  />
  <div
    class="flex items-center h-screen overflow-y-auto overflow-x-hidden flex-col wb-scroll bg-gradient-to-br from-gray-900 to-gray-700 w-full"
  >
    <AboutInfo />
    <AboutEntity />
    <AboutPortability />
    <AboutFinish />
  </div>
</template>
