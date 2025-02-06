import { defineStore } from 'pinia'

export const navbarView = defineStore('navbar', {
  state: () => ({
    toggled: false,
  }),
  actions: {
    toggleEvent() {
      this.toggled = !this.toggled
    },
  },
})
