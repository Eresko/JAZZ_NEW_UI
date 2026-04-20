import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'
import { useOptionsStore } from '@/store/options'
interface Tiket {
    balance: number;
    issue_date: string;
    loyalty_programs: string;
    number: string;
    owner: string;
    picture: string;
}
interface Query {
    currentPageReservation: number
    search: string
}

interface TicketState {
    tickets: Tiket[];
    lastPage:int;
    currentPage:int;
}

export const useTicketStore  = defineStore<'tickets', CurrentFilmsState>('tickets', {
    state: (): TicketState  => ({
        tickets: [],
    }),
    getters: {
        GET_FETCH_TICKETS: (state): TicketState  => state.tickets,
    },
    actions: {
        async FETCH_TICKETS(val:Query) {
            const optionsStore = useOptionsStore()

            try {
                const authStore = useAutorizationStore()
                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    const config = useRuntimeConfig();
                    const API_URL = config.public.apiBase;
                    let url = `${API_URL}users/reservation?page=${val.currentPageReservation}&search=${val.search}`
                    let headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                    const response = await axios.get(url, {headers})
                    if (response) {
                        if (val.currentPageReservation == 1) {
                            this.tickets = []
                        }
                            this.tickets.push(...response.data.data);
                        

                        console.log("T",this.tickets)
                        this.lastPage = response.data.lastPage
                        this.currentPage = response.data.currentPage
                    } else {
                        console.log("No data found");
                    }
                }

            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },
        SET_FETCH_TICKETS(data: CardsByClub) {
            this.cards = tickets;
        },
    },
});