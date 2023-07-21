import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;

async function findBookingByUserId(userId: number) {
    return prisma.booking.findFirst({
        where: {
            userId,
        },
        include: {
            Room: true,
        }
    });
}

async function findBookingsByRoomId(roomId: number) {
    return prisma.booking.findMany({
        where: {
            roomId,
        },
        include: {
            Room: true,
        }
    });
}

async function createBooking({ roomId, userId }: CreateParams): Promise<Booking> {
    return prisma.booking.create({
        data: {
            roomId,
            userId,
        }
    });
}

const bookingRepository = {
    findBookingByUserId,
    findBookingsByRoomId,
    createBooking,
};

export default bookingRepository;