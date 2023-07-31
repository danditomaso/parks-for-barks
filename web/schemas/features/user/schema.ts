import { User, UserRole } from "@prisma/client";

type _UserRole = Omit<UserRole, "id">;
type _User = Omit<User, "id">;
export type { _User, _UserRole };
