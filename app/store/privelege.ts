import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'


interface PrivelegePerformance {
    id: number
    img: string;
}

export const usePrivelegePerformanceStore  = defineStore<'PrivelegePerformance', HallPlanState>('PrivelegePerformance', {
    state: (): PrivelegePerformance => ({
        privelege_performance: [],
    }),
    getters: {
        GET_PRIVELEGE_PERFORMANCE: (state): StatusPerformance[] => state.status_performance,
    },
    actions: {
        async FETCH_PRIVELETE_PERFORMANCE() {
            try {
                const authStore = useAutorizationStore()
                let url =""
                const config = useRuntimeConfig()
                const API_URL = config.public.apiBase
                let headers = {}

                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    url = `${API_URL}users/privilege`
                    headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                }

                const response = await axios.get(url, {headers})

                this.privelege_performance = response.data

            } catch (e) {
                console.log("Error fetching status:", e)
            }
        },
    },
});