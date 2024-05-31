import { UserResponseDTO } from "../src/application/dto/user/UserResponseDTO";
import { UserService } from "./../src/application/services/user/UserService";
import { User } from "./../src/domain/models";

jest.mock("./../src/domain/models/User");

describe("UserService", () => {
  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        password: "cript23913912839123812931",
        active: true,
      };
      const userDTO = {
        id: 1,
        username: "testuser",
        active: true,
      };
      const userFindByPkMock = jest.fn().mockResolvedValue(mockUser);

      (User.findByPk as jest.Mock).mockImplementation(userFindByPkMock);

      const userService = new UserService();
      const user: UserResponseDTO = await userService.getUserById(1);

      expect(user).toEqual(userDTO);

      expect(userFindByPkMock).toHaveBeenCalledWith(1);
    });
  });
});
