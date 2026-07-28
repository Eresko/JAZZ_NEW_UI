import Tracker from '@openreplay/tracker'

export default defineNuxtPlugin((nuxtApp) => {
    // Инициализируем трекер только на клиенте
    const tracker = new Tracker({
        projectKey: "Wagb1Pxv5gfb7332AUN8", // Ваш ключ из скриншота
        ingestPoint: "https://open-play.add-flow.kz/ingest",
    })

    // Запускаем запись сессии
    tracker.start()

    // Прокидываем трекер в контекст Nuxt (опционально, чтобы использовать в коде как $tracker)
    return {
        provide: {
            tracker
        }
    }
})
