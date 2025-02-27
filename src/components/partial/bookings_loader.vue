<template>
  <div v-if='!hide' class='animate-pulse flex'>
    <div :class='height+" bg-gray-100 rounded-lg w-full"'>
<!--  <div v-if='hide' :class='height+" w-full flex flex-col items-center justify-center gap-y-3"'>-->

      <span class='text-xl font-bold text-second-color-200 '>{{ $t('No result found') }}</span>
      <span class='text-second-color-200'>{{ $t('Try adjusting your search or filter to find what you are looking for') }}</span>

    </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCurrentInstance as instance } from 'vue'

const hide = ref(true)

const props = defineProps({
  height: String,
})

onMounted(() => {
  setTimeout(() => {
    hide.value = true
  }, instance().proxy.$global.loading_time)
})
</script>