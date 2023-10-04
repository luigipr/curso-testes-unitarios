import * as infractionServices from "../../src/infractions-service"
import * as usersRepository from "../../src/users-repository";
describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    // TODO
    


    expect(true).toBe(true);
  });

  it("should throw an error when driver license does not exists", async () => {
    // TODO
    const license = '9999999';

    jest.spyOn(usersRepository, "getUserByDocument")
    .mockImplementationOnce((): any => {
      return undefined
    })

    const user = await infractionServices.getInfractionsFrom(license)

    expect(user).toBe(undefined);
    expect(user).rejects.toEqual({ 
      type: "NOT_FOUND", 
      message: "Driver not found." });
  })
});