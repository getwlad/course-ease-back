import { User } from "../../../domain/models";

export interface UserResponseDTO {
  id: number;
  username: string;
  active: boolean;
}

export function mapUserToRespDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    username: user.username,
    active: user.active,
  };
}
