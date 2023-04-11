<template>
  <div
    class="plan-card flex flex-col gap-4 items-center p-6"
    :class="selected && 'bg-blue-200'"
  >
    <div class="name text-2xl">
      {{ item.name }}
    </div>
    <div class="w-full">
      <div class="cpu">
        CPU: {{ item.cpu }} unit
      </div>
      <div class="ram">
        RAM: {{ item.ram }} MB
      </div>
      <div class="disk">
        DISK: {{ item.disk }} GB
      </div>
    </div>
    <button
      class="plan-button p-4 rounded bg-green-100 hover:bg-green-300"
      :class="selected && 'bg-red-100 hover:none pointer-events-none'"
      :disabled="selected"
      @click="selectPlan(item)"
    >
      {{ selected ? 'Got it!' : 'Select' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Plan } from '@/src/global/types'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Plan>,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectPlan (plan: Plan) {
      this.$emit('select', plan)
    }
  }
})
</script>
