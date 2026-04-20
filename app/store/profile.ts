import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'
interface Profile {
    birthday: string;
    created_at: string;
    email: string;
    email_verified_at: string;
    external_id: number;
    gender: number;
    id: number;
    name: string;
    phone: string;
    role_id: number;
    updated_at: string;

}

interface ProfileState {
    profile: Profile;
}

export const useProfileStore  = defineStore<'profile', ProfileState>('profile', {
    state: (): ProfileState => ({
        profile: {},
    }),
    getters: {
        GET_FETCH_PROFILE: (state): Profile => state.profile,
    },
    actions: {
        async FETCH_PROFILE() {
            try {
                const authStore = useAutorizationStore()
                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    const config = useRuntimeConfig();
                    const API_URL = config.public.apiBase;
                    let url = `${API_URL}users/profile`
                    let headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                    const response = await axios.get(url, {headers})
                    if (response) {
                        this.profile = response.data;
                    } else {
                        console.log("No data found");
                    }
                }
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },
        async SET_PROFILE(val) {
            try {
                const authStore = useAutorizationStore()
                if (authStore.IS_AUTH && authStore.GET_FETCH_TOKEN) {
                    const config = useRuntimeConfig();
                    const API_URL = config.public.apiBase;
                    let url = `${API_URL}users/update/`
                    let headers = {
                        Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                    }
                    const response = await axios.post(url,val, {headers})
                }
            } catch (e) {
                console.log("sheduleERR", e);
            }
        },
        SET_FETCH_PROFILE(data: Profile) {
            this.profile = data;
        },
    },
});