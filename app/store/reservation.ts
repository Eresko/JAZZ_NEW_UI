import { defineStore } from 'pinia';
import axios from 'axios';
import { useAutorizationStore } from '@/store/autorization'
import { useModalStore } from '@/store/modals'
import { useSelectedSeatStore } from '@/store/selectedSeat'

interface Reservation {
    id: number;
    img: string;
}

interface ReservationProcessing {
    performanceId: number;
    name: string;
    date: string;
}

interface ReservationState {
    reservation: Reservation[]; // список бронирований
    // параметры фильма/бронирования
    performanceId?: number;
    name?: string;
    date?: string;
    time?: string;
    price?: number;
    zal?: string;
    amount?: number;
    seats?: array;
    numberReservation?: string;
    status:boolean
    textSeats:string
    amount:float
}

export const useReservationStore = defineStore('Reservation', {
    state: (): ReservationState => ({
        reservation: [],
    }),
    getters: {
        GET_RESERVATION: (state): Reservation[] => state.reservation,
        GET_STATUS_RESERVATION: (state) => state.status,
        GET_RESERVATION_PARAMS: (state) => ({
            performanceId: state.performanceId,
            name: state.name,
            date: state.date,
            time: state.time,
            price: state.price,
            zal: state.zal,
            numberReservation: state.numberReservation,

        }),
    },
    actions: {
        SET_RESERVATION_PARAMS_STORAGE(performanceId: number, name: string, date: string,time: string,price:number,zal:string) {
            this.performanceId = performanceId;
            this.name = name;
            this.date = date;
            this.time = time;
            this.price = price;
            this.zal = zal;
        },
        async SET_RESERVATION_NOT_SELECT(val) {
            const modalStore = useModalStore()
            try {
                modalStore.TOGGLE_PRELOADER_MODAL()
                this.status = false;
                const config = useRuntimeConfig(); // ✅ подключаем Nuxt runtime config
                const API_URL = config.public.apiBase; // берем публичный API URL
                const authStore = useAutorizationStore()

                const selectedSeatStore = useSelectedSeatStore()
                const { data } = await axios.post(
                    `${API_URL}booking/reservation-not-select`,
                    val,
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.GET_FETCH_TOKEN}`
                        }
                    }
                )
                console.log(data)
                if (data?.reservationNumber) {
                    console.log("SUCESS")
                    this.numberReservation = data.reservationNumber

                    modalStore.SET_RESERVATION_MODAL(false)
                    modalStore.SET_BOOKING_SUCESS_MODAL(true)
                    selectedSeatStore.RESET_SELECTED_BY_SEAT_IDS(val.selectIds)

                } else {
                    modalStore.SET_RESERVATION_MODAL(false)
                    modalStore.SET_BOOKING_NOT_SUCESS_MODAL(true)
                }
                selectedSeatStore.RESET_BY_PERFORMANCE_ID(val.idPerformance)
                this.status = true;
            } catch (e) {
                console.log("sheduleERR", e);
            }
            modalStore.TOGGLE_PRELOADER_MODAL()
        },
    },
});