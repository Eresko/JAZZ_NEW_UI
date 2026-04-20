import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'
import { useModalStore } from '@/store/modals'

export const useSendMessageStore  = defineStore<'senMessage', CurrentFilmsState>('senMessage', {
    state: (): SendMessageState  => ({
        number: false,
    }),
    getters: {
        GET_NUMBER: (state): boolean => state.number,
    },
    actions: {
        async SEND_MESSAGE(val:any) {
            try {
                const authStore = useAutorizationStore()
                const modalStore = useModalStore()
                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    const config = useRuntimeConfig();
                    const API_URL = config.public.apiBase;
                    let url = `${API_URL}users/message/`
                    let headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                    const response = await axios.post(url,val, {headers})
                    if (response) {
                        this.number = response.data;
                        modalStore.SET_APPEAL_MODAL(true)
                    } else {
                        console.log("No data found");
                    }
                }

            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },
    },
});