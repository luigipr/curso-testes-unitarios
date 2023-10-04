import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import * as orderService from '../../src/order-service'
import { OrderInput } from "../../src/validator";
import httpStatus from "http-status";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    // TODO
    const order: OrderInput = {
      client: faker.person.fullName(),
      description: faker.commerce.product()
    }
  //createOrder(order)
  let protocol = new Date().getTime().toString()
  jest
    .spyOn(orderRepository, "create")
    .mockImplementationOnce((): any => {
      return {
        id: 1,
        client: order.client,
        description: order.description,
        protocol,
        status: "IN_PREPARATION"          
        }
      });
  const fakeorder = await orderService.createOrder(order)
    
    // expect(order.client).toEqual(expect.any(String))
    // expect(order.description).toEqual(expect.any(String))

    expect(fakeorder.protocol).toEqual(protocol)
    expect(fakeorder.status).toBe("IN_PREPARATION")

  });

  it("should return an order based on the protocol", async () => {
    // TODO
    let protocol = new Date().getTime().toString()

    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
      return {
        protocol,
        status: "IN_PREPARATION"
      }
    })
    const orderProtocol = await orderService.getOrderByProtocol(protocol)

    expect(orderProtocol.protocol).toEqual(protocol)
    expect(orderProtocol.status).toBe("IN_PREPARATION")
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    // TODO
    let protocol = new Date().getTime().toString();

    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
      return 
        undefined
    });

    const orderProtocol = await orderService.getOrderByProtocol(protocol)
    expect(orderProtocol.protocol).toEqual(protocol)
    expect(orderProtocol.status).toBe("INVALID")
  });
});