import { defineStore } from 'pinia';
import axios from 'axios';



interface Banners {
    id: number
    img: string;
}

export const useBannerStore  = defineStore<'Banner', BannerState>('Banner', {
    state: (): BannerState => ({
        banner: [],
    }),
    getters: {
        GET_FETCH_BANNERS: (state): Banners[] => state.banner,
    },
    actions: {
        async FETCH_BANNERS(val: any) {
            console.log('StART schedule');
            try {
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                const response = await axios.get(`${API_URL}banners/`);
                if (response) {
                    this.banner = response.data.result;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        SET_BANNERS_STORAGE(data: banner[]) {
            this.banner = data;
        },
    },
});