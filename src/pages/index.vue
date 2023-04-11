<template>
  <div class="main-page">
    <h1 class="text-center text-4xl">
      Client panel
    </h1>
    <div v-if="plans" class="plans flex justify-center items-center">
      <PlanCard
        v-for="plan in plans"
        :key="plan.name"
        :item="plan"
        :selected="user.plan.name === plan.name"
        @select="selectedPlan => setPlan(selectedPlan)"
      />
    </div>
    <div v-if="error" class="modal-error">
      <p class="text-center text-red-500">
        You can't downgrade to this plan. Please contact support!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Plan, User } from '@/src/global/types'

export default defineComponent({
  components: {},
  data () {
    return {
      user: { id: 'some_token', plan: {} } as User,
      plans: [] as Plan[],
      error: false as Boolean
    }
  },
  watch: {
    user: {
      handler () {
        this.setUser()
      },
      deep: true
    }
  },
  mounted () {
    this.getUser()
    this.getPlans('plans.json')
  },
  methods: {
    getUser () {
      const userData = localStorage.getItem('frontend-test')
      if (userData) {
        this.user = JSON.parse(userData)
        return
      }
      this.setUser()
    },

    setUser () {
      localStorage.setItem('frontend-test', JSON.stringify(this.user))
    },

    getPlans (url: string) {
      fetch(url)
        .then(response => response.json())
        .then(data => (this.plans = data.plans))
    },

    setPlan (newPlan: Plan) {
      if (this.user.plan.disk > newPlan.disk) {
        this.error = true
        return
      }
      this.user.plan = newPlan
      this.error = false
    }
  }
})
</script>
