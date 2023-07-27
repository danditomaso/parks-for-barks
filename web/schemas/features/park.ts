import { Park, ParkDetail } from "@prisma/client";

type _Park = Omit<Park, "id">;
export type { _Park, ParkDetail };
