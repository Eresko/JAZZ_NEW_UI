import { defineStore } from 'pinia';
import axios from 'axios';


interface InfoSeat {
    id: string;
    label: string;
    select: boolean;
    status: number;
}
interface SelectedSeat {
    performanceId: number;
    x: number;
    y: number;
    item: InfoSeat;
    row: number;
}

interface SelectedSeatState {
    selectedSeat: SelectedSeat[];
}

export const useSelectedSeatStore = defineStore('SelectedSeat', {
    state: (): SelectedSeatState => ({
        selectedSeat: [],
    }),

    getters: {

            GET_FETCH_SELECTED_SEAT: (state): SelectedSeat[] => state.selectedSeat,

            GET_SELECTED_COUNT: (state) => (performanceId: number): number =>
                state.selectedSeat.filter(seat => seat.performanceId === performanceId).length,

            GET_SELECTED_SEATS_BY_PERFORMANCE: (state) => {
                 return (performanceId: number) => {
                     let search = state.selectedSeat.filter(seat => seat.performanceId === performanceId);
                    return search
                }

            },

    },

    actions: {
        async RESET_SELECTED_BY_SEAT_IDS(ids: number[]) {
            if (typeof ids == 'undefined') {
                return
            }
            this.selectedSeat = this.selectedSeat.filter(
                seat => {
                    if (!seat.item || !seat.item.id) return true; // оставить такие, чтобы не удалять по ошибке
                    const seatId = seat.item.id;
                    return !ids.includes(seatId);
                }
            );
        },
        async FETCH_SELECTED(performanceId:number) {
            try {
               
            } catch (e) {
                console.log("Error fetching films:", e);
            }
        },
        async SELECTED(performanceId: number, x: number, y: number, item: InfoSeat,row:number) {
            const index = this.selectedSeat.findIndex(seat =>
                seat.performanceId === performanceId &&
                seat.x === x &&
                seat.y === y
            );

            if (index !== -1) {
                this.selectedSeat.splice(index, 1);
            } else {
                this.selectedSeat.push({ performanceId, x, y, item, row });
            }
        },
        async RESET_BY_PERFORMANCE_ID(performanceId: number) {
            this.selectedSeat = this.selectedSeat.filter(
                seat => seat.performanceId !== performanceId
            );
        }
    },
});