import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository/index";
import ticketRepository from "@/repositories/ticket-repository/index";
import enrollmentRepository from "@/repositories/enrollment-repository/index";
import { CardPaymentParams, PaymentParams } from '@/protocols';

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await checkTicket(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function checkTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
    await checkTicket(ticketId, userId);

    const ticket = await ticketRepository.findTicketWithTypeById(ticketId);

    const paymentData: PaymentParams = {
      ticketId,
      value: ticket.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.toString().slice(-4),
    };

    const payment = await paymentRepository.createPayment(ticketId, paymentData);
    await ticketRepository.processPayment(ticketId);
    return payment;
}

const paymentService = {
  getPaymentByTicketId,
  checkTicket,
  paymentProcess,
};

export default paymentService;