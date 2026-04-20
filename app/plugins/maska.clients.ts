import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.client) {
        const Maska = (await import('maska')).default
        nuxtApp.vueApp.use(Maska)
    }
})