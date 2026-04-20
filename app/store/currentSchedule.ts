import { defineStore } from 'pinia';
import axios from 'axios';



interface CurrentSchedule {
    performanceId: number
    StructureElementID: number;
    price: number;
    time: string;
    dateTime: string;
    zal: string;
    timestamp: string;
    id: string | null;
}

export const useCurrentScheduleStore  = defineStore<'CurrentSchedule', HallPlanState>('CurrentSchedule', {
    state: (): CurrentScheduleState => ({
        schedule: [],
    }),
    getters: {
        GET_FETCH_CURRENT_SCHEDULE: (state): CurrentSchedule[] => state.schedule,
    },
    actions: {
        async FETCH_CURRENT_SCHEDULE(performance: number) {
            try {
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                const response = await axios.get(`${API_URL}film-copy/movie-schedule/${performance}`);
                if (response) {
                    this.schedule = response.data;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        SET_CURRENT_SCHEDULE_STORAGE(data: CurrentSchedule[]) {
            this.schedule = data;
        },
    },
});