import { defineStore } from 'pinia'
import axios from 'axios'

interface AutorizationState {
    token: string | null
}

export const useAutorizationStore = defineStore('Autorization', {
    state: (): AutorizationState => ({
        token: null,
    }),

    getters: {
        GET_FETCH_TOKEN: (state): string | null => state.token,
        IS_AUTH: (state): boolean => !!state.token,
    },

    actions: {
        initToken() {
            if (process.client) {
                this.token = localStorage.getItem('token')
            }
        },

        async AUTHORIZATIONS(val: any): Promise<boolean> {
            try {
                const config = useRuntimeConfig()
                const API_URL = config.public.apiBase

                const response = await axios.post(
                    `${API_URL}users/auth/password/`,
                    val,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const token = response?.data?.token

                if (token) {
                    this.token = token
                    if (process.client) {
                        localStorage.setItem('token', token)
                    }
                    return true
                }

                return false
            } catch (e) {
                console.log('Authorization error:', e)
                return false
            }
        },
        async AUTHORIZATIONS_SMS(val: any): Promise<boolean> {
            try {
                const config = useRuntimeConfig()
                const API_URL = config.public.apiBase

                const response = await axios.post(
                    `${API_URL}users/auth/phone/`,
                    val,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                if ((typeof response != 'undefined') && (response == true))
                {
                    return true;
                }
                return false;
            } catch (e) {
                console.log('Authorization error:', e)
                return false
            }
        },
        async CHECK_SMS_CODE(val: any): Promise<boolean> {
            try {
                const config = useRuntimeConfig()
                const API_URL = config.public.apiBase

                const response = await axios.post(
                    `${API_URL}users/auth/check-sms-code/`,
                    val,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const token = response?.data?.token

                if (token) {
                    this.token = token
                    if (process.client) {
                        localStorage.setItem('token', token)
                    }
                    return true
                }

                return false
            } catch (e) {
                console.log('SMS check error:', e)
                return false
            }
        },

        async CHECK_TOKEN(): Promise<boolean> {
            try {
                if (!this.token) return false

                const config = useRuntimeConfig()
                const API_URL = config.public.apiBase

                await axios.get(`${API_URL}users/auth/check-token/`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })

                return true
            } catch (e) {
                this.LOGOUT()
                return false
            }
        },

        LOGOUT() {
            this.token = null
            if (process.client) {
                localStorage.removeItem('token')
            }
        },
    },
})
