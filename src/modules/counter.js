import { makeDummyShift, getNewStatus } from '../utility'

export const UPDATE_SHIFTS = 'counter/UPDATE_SHIFTS'
export const UPDATE_PIE_CHART = 'counter/UPDATE_PIE_CHART'
export const UPDATE_BAR_CHART = 'counter/UPDATE_BAR_CHART'
export const UPDATE_SUMMARY_COUNTS = 'counter/UPDATE_SUMMARY_COUNTS'

const generateShifts = () => {
    var shifts = [];
    for (var i = 0; i < 1000; i++) {
        shifts.push(makeDummyShift())
    }
    return shifts;
}

const initialState = {
    shifts: generateShifts(),
    pieChartData: [],
    barChartData: [],
    totalUnfilled: 0,
    totalConfirmed: 0,
    totalCancelled: 0,
    totalConfirmedOrUnfilled: 0
}


export const updateShiftsAsync = () => {
    return dispatch => {
        setInterval(() => {
            dispatch({
                type: UPDATE_SHIFTS
            })
            dispatch({
                type: UPDATE_PIE_CHART
            })
            dispatch({
                type: UPDATE_BAR_CHART
            })
            dispatch({
                type: UPDATE_SUMMARY_COUNTS
            })
        }, 1000)
    }
}

const totalAmounts = (shifts) => {
    const totalUnfilled = shifts.filter(shift => shift.status === "UNFILLED").length
    const totalConfirmed = shifts.filter(shift => shift.status === "CONFIRMED").length
    const totalCancelled = shifts.filter(shift => shift.status === "CANCELLED").length
    const totalConfirmedOrUnfilled = shifts.filter(shift => shift.status === "UNFILLED" || shift.status === "CONFIRMED").length
    return { totalUnfilled, totalConfirmed, totalCancelled, totalConfirmedOrUnfilled }
}


export default (state = initialState, action) => {
    const { shifts } = state;
    switch (action.type) {
        case UPDATE_SHIFTS:
            return {...state, shifts: state.shifts.map((s) => getNewStatus(s)) }
        case UPDATE_PIE_CHART:
            const { totalUnfilled, totalConfirmed, totalCancelled } = totalAmounts(shifts)
            const pieChartData = {
                labels: [
                    'UNFILLED',
                    'CONFIRMED',
                    'CANCELLED'
                ],
                datasets: [{
                    data: [totalUnfilled, totalConfirmed, totalCancelled],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            };
            return {...state, pieChartData }
        case UPDATE_BAR_CHART:
            //0-4, 4-8, 8-12
            const result1 = shifts.filter(shift => shift.duration >= 0 && shift.duration < 4).length
            const result2 = shifts.filter(shift => shift.duration >= 4 && shift.duration < 8).length
            const result3 = shifts.filter(shift => shift.duration >= 8 && shift.duration < 12).length
            const barChartData = {
                labels: [
                    '0-4',
                    '4-8',
                    '8-12'
                ],
                datasets: [{
                    label: 'Duration of shifts in units',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [result1, result2, result3]
                }]
            };
            return {...state, barChartData }

        case UPDATE_SUMMARY_COUNTS:
            const totals = totalAmounts(shifts);
            return {...state, ...totals }
    }
    return state;
}