import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository/index";
import enrollmentRepository from "@/repositories/enrollment-repository/index";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();
  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
};

export default ticketService;