export default interface Booking
{
    bookingId: number,
    userId: string,
    ticketId: number,
    scheduleId: string,
    bookingTime: Date,
    paymentTime: Date|null,
    canceledTime: Date|null,
    paid: boolean,
    canceled: boolean
}
