import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'
import { useModalStore } from '@/store/modals'
import { useSelectedSeatStore } from '@/store/selectedSeat'
import { useReservationStore } from '@/store/reservation'
import { useOperationStore } from '@/store/operation'


interface PaidState {
    paid: string[];
}

export const usePaidStore = defineStore('Paid', {
    state: (): PaidState => ({
        paid: [],
    }),
    getters: {
        GET_PAID: (state): PaidState => state.paid,
    },
    actions: {
        async SET_PAID_NOT_SELECT(val) {
            const modalStore = useModalStore()
            modalStore.TOGGLE_PRELOADER_MODAL()
            try {

                this.status = false;
                const config = useRuntimeConfig();
                const API_URL = config.public.apiBase;
                const authStore = useAutorizationStore()
                const modalStore = useModalStore()
                const selectedSeatStore = useSelectedSeatStore()
                const { data } = await axios.post(
                    `${API_URL}booking/payment-registration`,
                    val,
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                        }
                    }
                )
                console.log(data)
                if (data?.status) {
                    window.location.href = data.url;

                } else {
                    modalStore.SET_PAID_MODAL(false)
                    modalStore.SET_PAID_NOT_SUCESS_MODAL(true)
                    selectedSeatStore.RESET_BY_PERFORMANCE_ID(val.idPerformance)
                }
                this.status = true;
            } catch (e) {
                console.log("sheduleERR", e);
            }

            modalStore.TOGGLE_PRELOADER_MODAL()
        },
        async CHECK_PAY(transactionId:number) {
            const modalStore = useModalStore()
            modalStore.TOGGLE_PRELOADER_MODAL()
            try {
                const config = useRuntimeConfig();
                const API_URL = config.public.apiBase;
                const authStore = useAutorizationStore()

                const operationStore = useOperationStore()
                const reservationStore = useReservationStore()
                const { data } = await axios.get(
                    `${API_URL}booking/check-pay-extended/${transactionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                        }
                    }
                )
                if (data) {
                   let testSeat = operationStore.CREATE_TEXT_SEATS(data.seats,data.nameHall)
                    reservationStore.textSeats = testSeat;
                    reservationStore.amount = data.amount;
                    modalStore.TOGGLE_PRELOADER_MODAL()
                    modalStore.SET_PAY_COMPLETED_MODAL(true)
                }


            }
            catch (e) {
                modalStore.TOGGLE_PRELOADER_MODAL()
            }
        },
        async SET_PAID_WITH_BONUS_NOT_SELECT(val) {
            try {

                this.status = false;
                const config = useRuntimeConfig();
                const API_URL = config.public.apiBase;
                const authStore = useAutorizationStore()
                const modalStore = useModalStore()
                const selectedSeatStore = useSelectedSeatStore()
                const { data } = await axios.post(
                    `${API_URL}booking/payment-registration-bonus`,
                    val,
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                        }
                    }
                )
                console.log(data)
                if (data?.status) {
                    window.location.href = data.url;

                } else {
                    modalStore.SET_PAYMENT_WITH_BONUS_MODAL(false)
                    modalStore.SET_PAID_NOT_SUCESS_MODAL(true)
                }
                this.status = true;
            } catch (e) {
                console.log("sheduleERR", e);
            }
        },
    },
});