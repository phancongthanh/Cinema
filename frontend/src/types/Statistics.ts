export default interface Statistics {
    numberOfTicketsSold: {
        prevValue: number,
        value: number
    },
    numberOfMembers: number
    revenue: {
        prevValue: number,
        value: number
    },
    monthlyRevenue: Array<{
        year: number
        month: number,
        value: number
    }>,
    filmRevenue: Array<{
        title: string,
        value: number
    }>
}