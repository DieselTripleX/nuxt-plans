<template>
  <div class="admin-page">
    <h1 class="text-center text-4xl">
      Admin panel
    </h1>
    <div v-if="plans" class="plans flex justify-center items-center">
      <PlanCard
        v-for="plan in plans"
        :key="plan.name"
        :item="plan"
        :selected="selected.name === plan.name"
        @select="selectedPlan => (selected = selectedPlan)"
      />
    </div>
    <div class="edit-panel flex flex-col gap-4 m-auto max-w-lg">
      <div
        v-for="(field, index) in selected"
        :key="field"
        class="field flex flex-col"
      >
        <span>{{ index }}</span>
        <input
          v-model="newObject[index]"
          class="p-4 rounded bg-blue-100"
          type="text"
          :placeholder="field.toString()"
        >
      </div>
      <button class="button-submit rounded bg-green-300">
        NO SERVER SIDE LOGIC
      </button>
      <button class="button-submit rounded bg-red-300">
        NO SERVER SIDE LOGIC
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Plan } from '@/src/global/types'

export default defineComponent({
  components: {},
  data () {
    return {
      plans: [] as Plan[],
      selected: {} as Plan,
      newObject: {} as Plan
    }
  },
  mounted () {
    this.getPlans('plans.json')
  },
  methods: {
    getPlans (url: string) {
      fetch(url)
        .then(response => response.json())
        .then(data => (this.plans = data.plans))
    },

    // THERE IS NO POINT OF IMPLEMENTATION THE EDIT/DELETE/ADD FUNCTIONALITY WHEN YOU HAVE NO SERVER-SIDE LOGIC.
    // YOU CANT FETCH POST/PUT JSON FILES
    // BUT HERE IS EXAMPLE OF SERVER RELATED POST QUERY

    editPlan (url: string, id: string) {
      fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newObject)
      })
    },

    // THERE IS NO POINT OF IMPLEMENTATION THE EDIT/DELETE/ADD FUNCTIONALITY WHEN YOU HAVE NO SERVER-SIDE LOGIC.
    // YOU CANT FETCH POST/PUT JSON FILES
    // BUT HERE IS EXAMPLE OF SERVER RELATED POST QUERY

    deletePlan (url: string, id: string) {
      fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
    },

    // THERE IS NO POINT OF IMPLEMENTATION THE EDIT/DELETE/ADD FUNCTIONALITY WHEN YOU HAVE NO SERVER-SIDE LOGIC.
    // YOU CANT FETCH POST/PUT JSON FILES
    // BUT HERE IS EXAMPLE OF SERVER RELATED POST QUERY

    addPlan (url: string) {
      fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newObject)
      })
    }
  }
})
</script>
