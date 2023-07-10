import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository/index";
import ticketRepository from "@/repositories/ticket-repository/index";
import enrollmentRepository from "@/repositories/enrollment-repository/index";

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await checkTicket(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function checkTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

const paymentService = {
  getPaymentByTicketId,
  checkTicket,
};

export default paymentService;