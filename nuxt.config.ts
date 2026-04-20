// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: ['@pinia/nuxt'],

    axios: {
        baseURL: process.env.API
    },

    devtools: { enabled: true },

    devServer: {
        host: '192.168.22.245',
        port: 8067,
        hmr: {
            protocol: 'wss',
            port: 8068,
            host: 'jazz-nuxt3.zedform.ru',
        },
    },

    server: {
        https: true,
        hmr: {
            protocol: 'wss',
            host: 'jazz-nuxt3.zedform.ru',
            port: 5173,
        },
    },
    head: {
        title: "jazzcinema",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    runtimeConfig: {
        // приватные переменные (доступны только на сервере)
        apiSecret: process.env.API_SECRET || '',

        // публичные переменные (доступны в браузере через useRuntimeConfig().public)
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_URL || 'https://api-jazzcinema.zedform.ru/api/',
        },
    },
    css: ["@/assets/styles/main.scss"],
})
