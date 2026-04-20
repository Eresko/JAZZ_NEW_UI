import { defineStore } from 'pinia';

interface ModalState {
    textSeat: boolean;

}

export const useOperationStore = defineStore('Operation', {
    state: (): ModalState => ({
        textSeat: false,
    }),
    getters: {
    },

    actions: {
        CREATE_TEXT_SEATS(selected:array,hall:string) {
            let text = ''
            const arr = []
            if (typeof selected == 'undefined') {
                return text
            }
            const unicRows = [...new Set(selected.map(item => item.row))];

            unicRows.forEach(i => {
                arr.push({ row: i, seats: [] })
            })

            arr.forEach(i => {
                selected.forEach(j => {
                    if (i.row === j.row) {
                        i.seats.push(j.label)
                    }
                })
            })

            const sortedArr = arr.sort((a, b) => a.x > b.x ? 1 : -1);

            sortedArr.forEach(i => {
                text += hall + ', ' + (i.row)+ ' ряд, место '
                const len = i.seats.length
                i.seats.forEach((j, index) => {
                    text += (len !== index + 1 ? j + ', ' : j)
                })
                text += '<br />'
            })

            return text

        }

    },
});

