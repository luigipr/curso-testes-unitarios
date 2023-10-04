import { faker } from "@faker-js/faker";
import * as infractionServices from "../../src/infractions-service"
import * as infractionsRepository from '../../src/infractions-repository'
import * as userRepository from "../../src/users-repository";

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    jest.spyOn(userRepository, "getUserByDocument").mockImplementationOnce((): any => {
      return {
        id: 1,
        firstName: "Fake",
        lastName: "User",
        licenseId: "12345678"
      };
    });

    jest.spyOn(userRepository, "getUser").mockImplementationOnce((): any => {
      return {
        id: 1,
        firstName: "Fake",
        lastName: "User",
        licenseId: "12345678"
      };
    });

    const infractionsMock = jest.spyOn(infractionsRepository, "getInfractionsFrom");
    infractionsMock.mockImplementationOnce((userId: number): any => {
      return [
        {
          id: 1,
          date: new Date().toString(),
          description: "Fake Description",
          cost: 9999,
          level: "SEVERE",
          userId: 1
        }
      ]
    });

    const userInfractions = await infractionServices.getInfractionsFrom("12345678");
    expect(userInfractions).toMatchObject({
      id: 1,
      firstName: "Fake",
      lastName: "User",
      licenseId: "12345678"
    });

    const { infractions } = userInfractions;
    expect(infractions).toHaveLength(1);
    expect(infractions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          description: expect.any(String),
          cost: expect.any(Number),
          level: expect.any(String)
        })
      ])
    );
  });



  it("should throw an error when driver license does not exists", async () => {
    // TODO

    const license = '9999999';

    jest.spyOn(userRepository, "getUserByDocument")
    .mockImplementationOnce((): any => {
      return undefined
    })

    const user = infractionServices.getInfractionsFrom(license)

    expect(user).rejects.toEqual({ 
      type: "NOT_FOUND", message: "Driver not found." });
  })
});