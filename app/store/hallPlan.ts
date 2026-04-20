import { defineStore } from 'pinia';
import axios from 'axios';



interface HallPlan {
    id: number
    img: string;
}

export const useHallPlanStore  = defineStore<'HallPlan', HallPlanState>('HallPlan', {
    state: (): HallPlanState => ({
        hallPlan: [],
    }),
    getters: {
        GET_FETCH_PLAN: (state): HallPlan[] => state.hallPlan,
    },
    actions: {
        async FETCH_PLAN(val: any) {
            try {
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                const response = await axios.get(`${API_URL}halls/scheme/${val}`);
                if (response) {
                    this.hallPlan = response.data;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        SET_PLAN_STORAGE(data: HallPlan[]) {
            this.hallPlan = data;
        },
    },
});