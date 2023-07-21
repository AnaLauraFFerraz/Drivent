import { cannotBookError, notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import tikectRepository from "@/repositories/tickets-repository";

async function getBooking(userId: number) {
    const booking = await bookingRepository.findBookingByUserId(userId);
    if (!booking) throw notFoundError();
  
    return booking;
}

async function bookingRoomById(userId: number, roomId: number) {

}

async function updateBookingRoomById(userId: number, roomId: number) {

}

const bookingService = {
    bookingRoomById,
    getBooking,
    updateBookingRoomById,
};

export default bookingService;