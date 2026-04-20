import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'
import { useOptionsStore } from '@/store/options'
interface Card {
    balance: number;
    issue_date: string;
    loyalty_programs: string;
    number: string;
    owner: string;
    picture: string;
}

interface CardsByClub {
    [clubName: string]: Card[];
}

interface CardState {
    cards: CardsByClub;
}

export const useCardsStore  = defineStore<'cards', CurrentFilmsState>('cards', {
    state: (): CardState  => ({
        cards: {},
    }),
    getters: {
        GET_FETCH_CARDS: (state): CardsByClub  => state.cards,
    },
    actions: {
        async FETCH_CARDS() {
            const optionsStore = useOptionsStore()
            try {
                const authStore = useAutorizationStore()
                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    const config = useRuntimeConfig();
                    const API_URL = config.public.apiBase;
                    let url = `${API_URL}users/cards`
                    let headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                    const response = await axios.get(url, {headers})
                    if (response) {
                        this.cards = response.data;
                    } else {
                        console.log("No data found");
                    }
                }

            } catch (e) {
                console.log("Error fetching films:", e);
            }
            optionsStore.SET_UPDATE_CARD(false)
        },
        SET_FETCH_CARDS(data: CardsByClub) {
            this.cards = data;
        },
    },
});