import { defineStore } from 'pinia';
import axios from 'axios';

interface Film {
    id: number;
    title: string;
    // добавьте свойства по необходимости
}

interface CurrentFilmsState {
    films: Film[];
}

export const useCurrentFilmsStore = defineStore<'currentFilms', CurrentFilmsState>('currentFilms', {
    state: (): CurrentFilmsState => ({
        films: [],
    }),
    getters: {
        GET_CURRENT_FILMS: (state): Film[] => state.films,
    },
    actions: {
        async FETCH_CURRENT_FILMS(val: any) {
            console.log("Fetching films...");

            let dynamicUrl = 'current';

            const numVal = parseInt(val);
            if (numVal === 5) {
                dynamicUrl = 'not-only-jazz';
            } else if (numVal === 4) {
                dynamicUrl = 'retro';
            } else if (numVal === 3) {
                dynamicUrl = 'ps';
            } else if (numVal === 2) {
                dynamicUrl = 'future';
            }

            try {
                // Выполним запрос через axios
                const response = await axios.get(`https://api-jazzcinema.zedform.ru/api/film-copy/${dynamicUrl}/`);
                console.log(response);
                // Убедитесь, что в ответе приходят данные фильмов
                if (response && response.data) {
                    console.log(response.data);
                    this.films = response.data;  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        SET_FILMS_STORAGE(data: Film[]) {
            this.films = data;
        },
    },
});