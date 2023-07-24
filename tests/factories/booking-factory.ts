/* eslint-disable quotes */
import faker from '@faker-js/faker';
import { Address, Booking, Enrollment, Room, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type CreateBookingParams = {
  roomId: number;
  userId: number;
};

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export function createValidBody() {
  return {
    "roomId": faker.datatype.number(),
  };
}

export function getBookingReturn() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: 'Room 1',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}

export function getBookingDifferentUserIdReturn() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: faker.datatype.number(),
    roomId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: faker.datatype.number(),
      name: faker.datatype.string(),
      capacity: faker.datatype.number(),
      hotelId: faker.datatype.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}

export function findTicketByEnrollmentIdReturn() {
  const expected: Ticket & { TicketType: TicketType } = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.PAID,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: faker.datatype.string(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  return expected;
}

export function enrollmentWithAddressReturn() {
  const expected: Enrollment & { Address: Address[] } = {
    id: 1,
    name: faker.name.firstName(),
    cpf: '01234567890',
    birthday: new Date(),
    phone: faker.phone.phoneNumber(),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Address: [
      {
        id: 1,
        cep: faker.address.zipCode(),
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        number: faker.address.buildingNumber(),
        neighborhood: faker.address.county(),
        addressDetail: faker.address.buildingNumber(),
        enrollmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  return expected;
}

export function findRoomByIdReturn() {
  const expected: Room = {
    id: 1,
    name: faker.datatype.string(),
    capacity: 2,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expected;
}

export function findBookingByRoomIdReturn() {
  const expected: (Booking & { Room: Room })[] = [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: faker.datatype.string(),
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];

  return expected;
}

export function findBookingByRoomIdNoCapacityReturn() {
  const expected: (Booking & { Room: Room })[] = [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: faker.datatype.string(),
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];

  return expected;
}

export function findRoomByIdNoCapacityReturn() {
  const expected: Room = {
    id: 1,
    name: faker.datatype.string(),
    capacity: 1,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expected;
}