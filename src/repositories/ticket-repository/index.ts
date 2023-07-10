import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";
import { CreateTicketParams } from '@/protocols';

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    }
  });
}

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
};

export default ticketRepository;