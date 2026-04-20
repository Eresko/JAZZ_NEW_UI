import { defineStore } from 'pinia';

interface OptionsState {
    myCard: boolean; 
    updateProfile: boolean;
    updateCard: boolean;
    myTickets: boolean;
    myProfile: boolean;
    complaint: boolean;
    urlQr: string;
}

export const useOptionsStore = defineStore('Options', {
    state: (): OptionsState => ({
        myTickets: false,
        myCard: false,
        updateProfile: false,
        updateCard: false,
        myProfile: false,
        complaint: false,
        urlQr: "",
        selectedDay: "",
    }),

    getters: {
        GET_MY_CARD: (state): boolean => state.myCard,
        GET_UPDATE_PROFILE: (state): boolean => state.updateProfile,
        GET_UPDATE_CARD: (state): boolean => state.updateCard,
        GET_TIKECTS: (state): boolean => state.myTickets,
        GET_PROFILE: (state): boolean => state.myProfile,
        GET_COMPLAINT: (state): boolean => state.complaint,
        GET_URL_QR: (state): string => state.urlQr,
        GET_SELECTED_DAY: (state): string => state.selectedDay,
    },

    actions: {
        TOGGLE_MY_CARD() {
            this.myCard = !this.myCard;
        },
        TOGGLE_UPDATE_PROFILE() {
            this.updateProfile = !this.updateProfile;
        },
        TOGGLE_UPDATE_CARD() {
            this.updateCard = !this.updateCard;
        },

        TOGGLE_TICKETS() {
            this.myTickets = !this.myTickets;
        },

        TOGGLE_PROFILE() {
            this.myProfile = !this.myProfile;
        },

        TOGGLE_COMPLAINT() {
            this.complaint = !this.complaint;
        },

        RESET() {
            this.myTickets = false
            this.myCard = false
            this.myProfile = false
            this.complaint = false
        },

        SET_MY_CARD(value: boolean) {
            this.myCard = value;
        },

        SET_UPDATE_PROFILE(value: boolean) {
            this.myCard = value;
        },

        SET_UPDATE_CARD(value: boolean) {
            this.myCard = value;
        },

        SET_TICKETS(value: boolean) {
            this.myTickets = value;
        },

        SET_PROFILE(value: boolean) {
            this.myProfile = value;
        },

        SET_COMPLAINT(value: boolean) {
            this.complaint = value;
        },

        SET_URL_QR(value:string) {
            this.urlQr = value;
        },

        SET_SELECTED_DAY(value:string) {
            this.selectedDay = value;
        }
    },
});