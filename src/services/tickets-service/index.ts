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

const ticketService = {
  getTicketTypes,
};

export default ticketService;