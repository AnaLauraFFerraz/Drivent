/* eslint-disable quotes */
import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Hotel, Room, Ticket, TicketStatus, TicketType } from '@prisma/client';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.address.buildingNumber(),
      capacity: 2,
      hotelId: hotelId,
    },
  });
}

export function findTicketFailByEnrollmentIdReturn() {
  const expected: Ticket & { TicketType: TicketType } = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.RESERVED,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'Teste',
      price: 300,
      isRemote: true,
      includesHotel: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  return expected;
}

export function getHotelsMock() {
  const expect: Hotel[] = [
    {
      id: 1,
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return expect;
}

export function getRoomsByHotelIdMock() {
  const expect: Hotel & { Rooms: Room[] } = {
    id: 1,
    name: faker.name.findName(),
    image: String(faker.image),
    createdAt: new Date(),
    updatedAt: new Date(),
    Rooms: [
      {
        id: 1,
        name: String(faker.name),
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  return expect;
}