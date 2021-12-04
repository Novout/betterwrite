<template>
  <footer
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 300 } }"
    class="w-full text-gray-200 bg-black-opacity body-font"
  >
    <div
      class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col"
    >
      <a
        class="flex title-font font-medium items-center md:justify-start justify-center"
      >
        <img class="shadow-lg rounded-xs" src="@/assets/logo.png" width="15" />
        <span class="ml-3 text-xl">Better Write</span>
      </a>
      <span
        class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start"
      >
        <a
          href="https://github.com/Novout/better-write"
          target="_blank"
          rel="noreferrer"
          class="cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--zmdi"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 432 432"
          >
            <path
              d="M43 3h341q18 0 30.5 12.5T427 45v342q0 17-12.5 29.5T384 429H274q-7-1-7-21v-58q0-27-15-40q44-5 70.5-27t26.5-78q0-33-22-57q11-26-2-57q-18-6-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 91h-6q-12 31-2 57q-22 24-22 57q0 55 27 77.5t70 27.5q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5T56 303t8 9q15 7 24 31q1 2 2 4.5t6.5 9.5t13 10.5T130 374t30-2v36q0 20-8 21H43q-18 0-30.5-12.5T0 387V45q0-17 12.5-29.5T43 3z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </span>
    </div>
  </footer>
</template>
