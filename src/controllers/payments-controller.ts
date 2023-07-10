import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);

  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  try {
    const payment = await paymentService.getPaymentByTicketId(userId, ticketId);
    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response) {
  //TO DO
}