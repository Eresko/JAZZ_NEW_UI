import { defineStore } from 'pinia';
import axios from 'axios';

// Интерфейсы
interface FilmSchedule {
    day: string;
    schedule: object[];
    schedule_time: object[];
}

interface CurrentFilm {
    id: number;
    name_film: string;
    genre: string;
    schedule: FilmSchedule[];
}

interface BannerState {
    currentFilms: CurrentFilm[];
    currentFilm: CurrentFilm | null;
    currentFilmSchedule: FilmSchedule[];
}

export const useCurrentFilmStore = defineStore<'CurrentFilm', BannerState>('CurrentFilm', {
    state: (): BannerState => ({
        currentFilms: [],
        currentFilm: null,
        currentFilmSchedule: [],
    }),

    getters: {
        GET_CURRENT_FILMS: (state): CurrentFilm[] => state.currentFilms,
        GET_CURRENT_FILM: (state): CurrentFilm | null => state.currentFilm,
        GET_CURRENT_FILM_SCHEDULE: (state): FilmSchedule[] => state.currentFilmSchedule,
    },

    actions: {
        async FETCH_CURRENT_FILMS(val: string) {
            let dynamicUrl = 'current';

            switch (parseInt(val)) {
                case 5: dynamicUrl = 'not-only-jazz'; break;
                case 4: dynamicUrl = 'retro'; break;
                case 3: dynamicUrl = 'ps'; break;
                case 2: dynamicUrl = 'future'; break;
                default: dynamicUrl = 'current'; break;
            }

            try {
                const config = useRuntimeConfig(); // подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // получаем публичный API URL
                const response = await axios.get(`${API_URL}film-copy/${dynamicUrl}/`);

                if (response && response.data) {
                    this.SET_CURRENT_FILMS(response.data);  // Присваиваем данные фильмов
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },

        async GET_FILM_BY_ID(id: number) {
            try {
                const config = useRuntimeConfig(); // подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // получаем публичный API URL
                const response = await axios.get(`${API_URL}film-copy/specific/${id}`);
                if (response && response.data) {
                    const newArr = response.data.schedule.map((i: any) => ({
                        ...i,
                        schedule: [{
                            schedule_time: i.schedule_time,
                            genre: response.data.genre,
                            name_film: response.data.name_film,
                        }],
                    }));

                    this.SET_FILM_BY_ID(response.data);
                    this.SET_CURRENT_FILM_SCHEDULE(newArr);
                } else {
                    console.log("No data found");
                }
            } catch (e) {
                console.log("Error fetching film by ID:", e);
            }
        },

        SET_CURRENT_FILMS(currentFilms: CurrentFilm[]) {
            this.currentFilms = currentFilms;
        },

        SET_FILM_BY_ID(currentFilm: CurrentFilm) {
            this.currentFilm = currentFilm;
        },

        SET_CURRENT_FILM_SCHEDULE(currentFilmSchedule: FilmSchedule[]) {
            this.currentFilmSchedule = currentFilmSchedule;
        }
    },
});