import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'


interface StatusPerformance {
    id: number
    img: string;
}

export const useStatusPerformanceStore  = defineStore<'StatusPerformance', HallPlanState>('StatusPerformance', {
    state: (): StatusPerformanceState => ({
        status_performance: [],
    }),
    getters: {
        GET_STATUS_PERFORMANCE: (state): StatusPerformance[] => state.status_performance,
    },
    actions: {
        async FETCH_STATUS_PERFORMANCE3(performanceId: number) {
            try {
                const authStore = useAutorizationStore()

                const config = useRuntimeConfig()
                const API_URL = config.public.apiBase

                let url = `${API_URL}film-copy/status/${performanceId}`
                let headers = {}

                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    url = `${API_URL}film-copy/status-auth/${performanceId}`
                    headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                }

                const response = await axios.get(url, {headers})

                this.status_performance = response.data

            } catch (e) {
                console.log("Error fetching status:", e)
            }
        },
        async FETCH_STATUS_PERFORMANCE(val:any) {
            try {
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                const response = await axios.get(`${API_URL}film-copy/status/${val.performance_id}`);
                if (response) {
                    this.status_performance = response.data;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },
        async FETCH_STATUS_PERFORMANCE2(val:any) {
            try {
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + val.token
                const response = await axios.get(`${API_URL}film-copy/status-auth/${val.performance_id}`);
                if (response) {
                    this.status_performance = response.data;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        SET_STATUS_PERFORMANCE_STORAGE(data: CurrentSchedule[]) {
            this.status_performance = data;
        },
    },
});