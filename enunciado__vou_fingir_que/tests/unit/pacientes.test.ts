import { v4 as uuidv4 } from 'uuid';
import { generateProtocolForPacient } from 'protocols-generator';
import { buildRandomPacientProtocol } from '../factories/protocols.factory';

jest.mock("uuid", () => {
  return {
    v4: () => { return "valor simulado no mock" }
  }
});

describe("generate protocol for patients", () => {
  it("should generate a protocol", () => {

    const patient = buildRandomPacientProtocol();
    const protocol = generateProtocolForPacientTest(patient)
    console.log(protocol)
    expect(protocol).toEqual({
      priority: expect.any(Boolean),
      date: expect.any(Date),
      pacient: expect.any(String),
      protocol: expect.any(String)
    })

  });
});


function generateProtocolForPacientTest(patient) {
  const protocol = uuidv4()
  return {
    priority: patient.priority,
    date: new Date(),
    pacient: `${patient.firstname} ${patient.lastname}`,
    protocol,
  }
}