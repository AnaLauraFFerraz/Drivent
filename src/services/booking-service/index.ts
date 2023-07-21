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

async function checkEnrollmentTicket(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw cannotBookError();

    const ticket = await tikectRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotBookError();
    }
}

async function checkValidBooking(roomId: number) {
    const room = await hotelRepository.findRoomById(roomId);
    if (!room) throw notFoundError();

    const bookings = await bookingRepository.findBookingsByRoomId(roomId);
    if (room.capacity <= bookings.length) throw cannotBookError();
}

async function bookingRoomById(userId: number, roomId: number) {
    await checkEnrollmentTicket(userId);
    await checkValidBooking(roomId);

    return bookingRepository.createBooking({ roomId, userId });
}

async function updateBookingRoomById(userId: number, roomId: number) {

}

const bookingService = {
    bookingRoomById,
    getBooking,
    updateBookingRoomById,
};

export default bookingService;