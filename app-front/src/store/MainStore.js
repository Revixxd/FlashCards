import { defineStore } from 'pinia'

export const navbarView = defineStore('navbar', {
  state: () => ({
    toggled: true,
  }),
  actions: {
    toggleEvent() {
      this.toggled = !this.toggled
    },
  },
})
