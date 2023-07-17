import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRoomsById(hotelId: number) {

}

const hotelRepository = {
  findHotels,
  findHotelRoomsById,
};

export default hotelRepository;