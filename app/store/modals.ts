import { defineStore } from 'pinia';

interface ModalState {
    authModal: boolean;
    regModal: boolean;
    fastRegModal: boolean;
    reservationModal: boolean;
    bookingNotSuccess: boolean;
    bookingSuccess: boolean;
    appeal: boolean;
    video: boolean;
    checkCode: boolean;
    authSuccess: boolean;
    paidModal: boolean;
    modalsPayCompleted: boolean;
    paidNotSuccess: boolean;
    paymentWithBonus: boolean;
    qrModal: boolean;
    preloader: boolean;
    mobileMenu: boolean;
}

export const useModalStore = defineStore('Modal', {
    state: (): ModalState => ({
        authModal: false,
        regModal: false,
        fastRegModal: false,
        reservationModal: false,
        bookingNotSuccess: false,
        bookingSuccess: false,
        appeal: false,
        video: false,
        checkCode: false,
        authSuccess: false,
        paidModal: false,
        modalsPayCompleted: false,
        paidNotSuccess: false,
        paymentWithBonus: false,
        qrModal: false,
        preloader: false,
        mobileMenu: false
    }),

    getters: {
        GET_AUTH_MODAL: (state): boolean => state.authModal,
        GET_FAST_REG_MODAL: (state): boolean => state.fastRegModal,
        GET_REG_MODAL: (state): boolean => state.regModal,
        GET_RESERVATION_MODAL: (state): boolean => state.reservationModal,
        GET_BOOKING_NOT_SUCESS_MODAL: (state): boolean => state.bookingNotSuccess,
        GET_BOOKING_SUCESS_MODAL: (state): boolean => state.bookingSuccess,
        GET_APPEAL_MODAL: (state): boolean => state.appeal,
        GET_VIDEO_MODAL: (state): boolean => state.video,
        GET_CHEK_CODE_MODAL: (state): boolean => state.checkCode,
        GET_AUTH_SUCCESS_MODAL: (state): boolean => state.authSuccess,
        GET_PAID_MODAL: (state): boolean => state.paidModal,
        GET_PAY_COMPLETED_MODAL: (state): boolean => state.modalsPayCompleted,
        GET_PAID_NOT_SUCESS_MODAL: (state): boolean => state.paidNotSuccess,
        GET_PAUMENT_WITH_BONUS_MODAL: (state): boolean => state.paymentWithBonus,
        GET_QR_MODAL: (state): boolean => state.qrModal,
        GET_PRELOADER_MODAL: (state): boolean => state.preloader,
        GET_MOBILE_MENU: (state): boolean => state.mobileMenu,
    },

    actions: {
        TOGGLE_AUTH_MODAL() {
            this.authModal = !this.authModal;
        },

        TOGGLE_FAST_REG_MODAL() {
            this.fastRegModal = !this.fastRegModal;
        },

        TOGGLE_REG_MODAL() {
            this.regModal = !this.regModal;
        },

        TOGGLE_RESERVATION_MODAL() {
            this.reservationModal = !this.reservationModal;
        },

        TOGGLE_BOOKING_NOT_SUCESS_MODAL() {
            this.bookingNotSuccess = !this.bookingNotSuccess;
        },

        TOGGLE_BOOKING_SUCESS_MODAL() {
            this.bookingSuccess = !this.bookingSuccess;
        },

        TOGGLE_APPEAL_MODAL() {
            this.appeal = !this.appeal;
        },

        TOGGLE_VIDEO_MODAL() {
            this.video = !this.video;
        },

        TOGGLE_CHECK_CODE_MODAL() {
            this.checkCode = !this.checkCode;
        },

        TOGGLE_AUTH_SUCCESS_MODAL() {
            this.authSuccess = !this.authSuccess;
        },

        TOGGLE_PAID_MODAL() {
            this.paidModal = !this.paidModal;
        },

        TOGGLE_PAY_COMPLETED_MODAL() {
            this.modalsPayCompleted = !this.modalsPayCompleted;
        },

        TOGGLE_PAID_NOT_SUCESS_MODAL() {
            this.paidNotSuccess = !this.paidNotSuccess;
        },

        TOGGLE_PAYMENT_WITH_BONUS_MODAL() {
            this.paymentWithBonus = !this.paymentWithBonus;
        },

        TOGGLE_QR_MODAL() {
            this.qrModal = !this.qrModal;
        },

        TOGGLE_PRELOADER_MODAL() {
            this.preloader = !this.preloader;
        },

        TOGGLE_MOBILE_MENU() {
            this.mobileMenu = !this.mobileMenu;
        },

        SET_AUTH_MODAL(value: boolean) {
            this.authModal = value;
        },

        SET_FAST_REG_MODAL(value: boolean) {
            this.fastRegModal = value;
        },

        SET_REG_MODAL(value: boolean) {
            this.regModal = value;
        },

        SET_RESERVATION_MODAL(value: boolean) {
            this.reservationModal = value;
        },

        SET_BOOKING_NOT_SUCESS_MODAL(value: boolean) {
            this.bookingNotSuccess = value;
        },

        SET_BOOKING_SUCESS_MODAL(value: boolean) {
            this.bookingSuccess = value;
        },

        SET_APPEAL_MODAL(value: boolean) {
            this.appeal = value;
        },

        SET_VIDEO_MODAL(value: boolean) {
            this.video = value;
        },

        SET_CHECK_CODE_MODAL(value: boolean) {
            this.checkCode = value;
        },

        SET_AUTH_SECCESS(value: boolean) {
            this.authSuccess = value;
        },
        SET_PAID_MODAL(value: boolean) {
            this.paidModal = value;
        },

        SET_PAY_COMPLETED_MODAL(value: boolean) {
            this.modalsPayCompleted = value;
        },

        SET_PAID_NOT_SUCESS_MODAL(value: boolean) {
            this.paidNotSuccess = value;
        },

        SET_PAYMENT_WITH_BONUS_MODAL(value: boolean) {
            this.paymentWithBonus = value;
        },

        SET_QR_MODAL(value: boolean) {
            this.qrModal = value;
        },

        SET_PRELOAER_MODAL(value: boolean) {
            this.preloader = value;
        },

        SET_MOBILE_MENU(value: boolean) {
            this.mobileMenu = value;
        },

    },
});
