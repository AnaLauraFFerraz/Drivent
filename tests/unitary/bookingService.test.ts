/* eslint-disable quotes */
import bookingService from '../../src/services/booking-service';
import bookingRepository from '@/repositories/booking-repository';
import { cannotBookError, notFoundError } from '@/errors';
import {
  enrollmentWithAddressReturn,
  findBookingByRoomIdNoCapacityReturn,
  findBookingByRoomIdReturn,
  findRoomByIdNoCapacityReturn,
  findRoomByIdReturn,
  findTicketByEnrollmentIdReturn,
  getBookingDifferentUserIdReturn,
  getBookingReturn,
} from '../factories';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import hotelRepository from '@/repositories/hotel-repository';

describe('getBooking function', () => {
  it('should return the booking for the given user id', async () => {
    const userId = 1;
    const booking = getBookingReturn();

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(booking);

    const result = await bookingService.getBooking(userId);

    expect(bookingRepository.findBookingByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(booking);
  });

  it('should throw notFoundError if the booking for the given user id is not found', async () => {
    const userId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(null);

    await expect(bookingService.getBooking(userId)).rejects.toEqual(notFoundError());
    expect(bookingRepository.findBookingByUserId).toHaveBeenCalledWith(userId);
  });
});

describe('bookingRoomById function', () => {
  it('should create a booking for the given user and room', async () => {
    const userId = 1;
    const roomId = 1;
    const booking = getBookingReturn();

    jest.spyOn(bookingService, 'checkEnrollmentTicket').mockResolvedValue(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(bookingService, 'checkValidBooking').mockResolvedValue(undefined);
    jest.spyOn(hotelRepository, 'findRoomById').mockResolvedValue(findRoomByIdReturn());
    jest.spyOn(bookingRepository, 'findBookingsByRoomId').mockResolvedValue(findBookingByRoomIdReturn());

    jest.spyOn(bookingRepository, 'createBooking').mockResolvedValue(booking);

    const result = await bookingService.bookingRoomById(userId, roomId);

    expect(bookingRepository.createBooking).toHaveBeenCalledWith({ userId, roomId });
    expect(result).toEqual(booking);
  });
});

describe('updateBookingRoomById function', () => {
  it('should change booking boom by id', async () => {
    const userId = 1;
    const roomId = 1;
    const booking = getBookingReturn();

    jest.spyOn(bookingService, 'checkValidBooking').mockResolvedValue(undefined);
    jest.spyOn(hotelRepository, 'findRoomById').mockResolvedValue(findRoomByIdReturn());
    jest.spyOn(bookingRepository, 'findBookingsByRoomId').mockResolvedValue(findBookingByRoomIdReturn());

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(booking);
    jest.spyOn(bookingRepository, 'upsertBooking').mockResolvedValue(booking);

    const result = await bookingService.updateBookingRoomById(userId, roomId);
    expect(result).toEqual(booking);
  });

  it('should return booking error with booking not exists', async () => {
    const userId = 1;
    const roomId = 1;
    const booking = getBookingReturn();

    jest.spyOn(bookingService, 'checkValidBooking').mockResolvedValue(undefined);
    jest.spyOn(hotelRepository, 'findRoomById').mockResolvedValue(findRoomByIdReturn());
    jest.spyOn(bookingRepository, 'findBookingsByRoomId').mockResolvedValue(findBookingByRoomIdReturn());

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(null);

    await expect(bookingService.updateBookingRoomById(userId, roomId)).rejects.toEqual(cannotBookError());
  });

  it('should return booking error with user id different from booking userid', async () => {
    const userId = 1;
    const roomId = 1;
    const booking = getBookingDifferentUserIdReturn();

    jest.spyOn(bookingService, 'checkValidBooking').mockResolvedValue(undefined);
    jest.spyOn(hotelRepository, 'findRoomById').mockResolvedValue(findRoomByIdReturn());
    jest.spyOn(bookingRepository, 'findBookingsByRoomId').mockResolvedValue(findBookingByRoomIdReturn());

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(booking);
    jest.spyOn(bookingRepository, 'upsertBooking').mockResolvedValue(booking);

    await expect(bookingService.updateBookingRoomById(userId, roomId)).rejects.toEqual(cannotBookError());
  });
});

describe('checkEnrollmentTicket function', () => {
  it('should return error in find enrollment', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(bookingService, 'checkEnrollmentTicket').mockResolvedValue(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(bookingService.bookingRoomById(userId, roomId)).rejects.toEqual(cannotBookError());
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
  });

  it('should return error in find ticket', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(bookingService, 'checkEnrollmentTicket').mockResolvedValue(undefined);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(bookingService.bookingRoomById(userId, roomId)).rejects.toEqual(cannotBookError());
    expect(ticketRepository.findTicketByEnrollmentId).toHaveBeenCalledWith(userId);
  });
});

describe('checkValidBooking function', () => {
  it('should return error in find room by id', async () => {
    const roomId = 1;

    jest.spyOn(hotelRepository, 'findRoomById').mockResolvedValue(null);
    jest.spyOn(bookingRepository, 'findBookingsByRoomId').mockResolvedValue(findBookingByRoomIdReturn());

    await expect(bookingService.checkValidBooking(roomId)).rejects.toEqual(notFoundError());
  });

  it('should return error in fin booking by Room Id', async () => {
    const roomId = 1;

    jest.spyOn(hotelRepository, 'findRoomById').mockResolvedValue(findRoomByIdNoCapacityReturn());
    jest.spyOn(bookingRepository, 'findBookingsByRoomId').mockResolvedValue(findBookingByRoomIdNoCapacityReturn());

    await expect(bookingService.checkValidBooking(roomId)).rejects.toEqual(cannotBookError());
  });
});