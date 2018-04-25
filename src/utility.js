export const makeDummyShift = () => {
    return { duration: Math.round(Math.random() * (12 - 1) + 1), status: "UNFILLED" }
}

export const getNewStatus = (shift) => {
    var p = Math.random();
    if (p >= 0.97) return {...shift, status: "UNFILLED" }
    if (shift.duration >= 6 && p < 0.02) return {...shift, status: "CONFIRMED" }
    if (shift.duration <= 6 && p < 0.01) return {...shift, status: "CANCELLED" };

    return shift;
}