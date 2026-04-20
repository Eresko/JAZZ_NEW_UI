import { defineStore } from 'pinia';
import axios from 'axios';

interface Schedule {
    day: string;
    schedule: Array;
    // добавьте свойства по необходимости
}

interface ScheduleState {
    schedule: Schedule[];
}

export const useScheduleStore  = defineStore<'schedule', CurrentFilmsState>('schedule', {
    state: (): ScheduleState => ({
        schedule: [],
    }),
    getters: {
        GET_FETCH_SCHEDULE: (state): Schedule[] => state.schedule,
    },
    actions: {
        async FETCH_SCHEDULE(val: any) {
            console.log('StART schedule');
            try {
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                const response = await axios.get(`${API_URL}film-copy/movie-schedule`);
                if (response) {
                    this.schedule = response.data.shedule_films;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        SET_FETCH_SCHEDULE(data: schedule[]) {
            this.schedule = data;
        },
    },
});