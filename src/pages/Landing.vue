<template>
  <img
    src="@/assets/logo.png"
    class="
      absolute
      top-1/2
      left-1/4
      transform
      -translate-x-1/2 -translate-y-1/2
      opacity-25
      w-40
      md:w-52
      lg:w-60
      xl:w-72
    "
  />
  <main class="min-h-screen w-full landing">
    <LandingFirst />
    <LandingSecond />
    <LandingThird />
  </main>
</template>
