<template>
  <div class="flex flex-wrap justify-center mt-20 gap-10">
    <PlanCard
      :content="{
        plan: t('plans.beginner.name'),
        description: t('plans.beginner.description'),
        price: t('plans.beginner.price'),
        features: [
          {
            status: t('plans.beginner.features[0].status'),
            description: t('plans.beginner.features[0].description'),
          },
          {
            status: t('plans.beginner.features[1].status'),
            description: t('plans.beginner.features[1].description'),
          },
          {
            status: t('plans.beginner.features[2].status'),
            description: t('plans.beginner.features[2].description'),
          },
          {
            status: t('plans.beginner.features[3].status'),
            description: t('plans.beginner.features[3].description'),
          },
          {
            status: t('plans.beginner.features[4].status'),
            description: t('plans.beginner.features[4].description'),
          },
          {
            status: t('plans.beginner.features[5].status'),
            description: t('plans.beginner.features[5].description'),
          },
        ],
      }"
    />
    <PlanCard
      :content="{
        plan: t('plans.intermediate.name'),
        description: t('plans.intermediate.description'),
        price: t('plans.intermediate.price'),
        features: [
          {
            status: t('plans.intermediate.features[0].status'),
            description: t('plans.intermediate.features[0].description'),
          },
          {
            status: t('plans.intermediate.features[1].status'),
            description: t('plans.intermediate.features[1].description'),
          },
          {
            status: t('plans.intermediate.features[2].status'),
            description: t('plans.intermediate.features[2].description'),
          },
          {
            status: t('plans.intermediate.features[3].status'),
            description: t('plans.intermediate.features[3].description'),
          },
          {
            status: t('plans.intermediate.features[4].status'),
            description: t('plans.intermediate.features[4].description'),
          },
          {
            status: t('plans.intermediate.features[5].status'),
            description: t('plans.intermediate.features[5].description'),
          },
        ],
      }"
    />
    <PlanCard
      :content="{
        plan: t('plans.advanced.name'),
        description: t('plans.advanced.description'),
        price: t('plans.advanced.price'),
        features: [
          {
            status: t('plans.advanced.features[0].status'),
            description: t('plans.advanced.features[0].description'),
          },
          {
            status: t('plans.advanced.features[1].status'),
            description: t('plans.advanced.features[1].description'),
          },
          {
            status: t('plans.advanced.features[2].status'),
            description: t('plans.advanced.features[2].description'),
          },
          {
            status: t('plans.advanced.features[3].status'),
            description: t('plans.advanced.features[3].description'),
          },
          {
            status: t('plans.advanced.features[4].status'),
            description: t('plans.advanced.features[4].description'),
          },
          {
            status: t('plans.advanced.features[5].status'),
            description: t('plans.advanced.features[5].description'),
          },
        ],
      }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
