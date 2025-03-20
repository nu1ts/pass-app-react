import { transformDate, sliceDate, getToday } from "./converter/dateConverter"

export const dateAreValid = (startDate, endDate) => {
    return transformDate(startDate) <= transformDate(endDate);
}

export const endDateValid = (endDate) => {
    return sliceDate(endDate) <= getToday();
}