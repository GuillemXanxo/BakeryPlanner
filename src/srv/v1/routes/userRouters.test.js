require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const connectDB = require("../../../db");
const Usuari = require("../../../db/models/User");
const { app } = require("../..");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectDB(connectionString);
});

beforeEach(async () => {
  await Usuari.create({
    name: "gxanxo",
    password: "$2b$12$KnjkBf7vey3gckkpSkfBn.4kaIvpp4rR/O3ObavMUSLzheB7rx8Zi",
    email: "Guillem@gmail.com",
    createdAt: 666666666,
  });
});

afterEach(async () => {
  await Usuari.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
  mongoServer.stop();
});

describe("Given an endpoint /user/access/login", () => {
  describe("When it receives a post request with body {name: 'gxanxo': password:'guillemito'}", () => {
    test("Then it should respond with status 200 and a json with a token", async () => {
      const User = {
        name: "gxanxo",
        password: "guillemito",
      };

      const {
        body: { token },
      } = await request(app).post("/user/access/login").send(User).expect(200);

      expect(token).toBeTruthy();
    });
  });

  describe("When it receives a post request with body {name: 'gxanxo': password:'wrongpass'}", () => {
    test("Then it should respond with status 401 and a json with an error property", async () => {
      const wrongUsuari = {
        name: "gxanxo",
        password: "wrongpass",
      };

      const { body } = await request(app)
        .post("/user/access/login")
        .send(wrongUsuari)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe("Some of your data is invalid");
    });
  });

  // describe("When it receives a post request with body {usuari: 'wrongUsuari': contrassenya:'guillemito'}", () => {
  //   test("Then it should respond with status 401 and a json with an error property", async () => {
  //     const wrongUsuari = {
  //       usuari: "wrongUsuari",
  //       contrassenya: "guillemito",
  //     };

  //     const { body } = await request(app)
  //       .post("/usuari/login")
  //       .send(wrongUsuari)
  //       .expect(401);

  //     expect(body).toHaveProperty("error");
  //     expect(body.message).toBe("Alguna de les teves dades no és vàlida");
  //   });
  // });
});

// describe("Given a user/register endpoint", () => {
//   describe("When it receives a post request with an existing user", () => {
//     test("Then it should respond with an error message `Alguna cosa ha anat malament en el registre`", async () => {
//       const userToCreate = {
//         nom: "Marc",
//         usuari: "gxanxo",
//         contrassenya: "marc",
//         telefon: "123456789",
//       };

//       const errorMessage = `Alguna cosa ha anat malament en el registre`;

//       const { body } = await request(app)
//         .post("/usuari/register")
//         .send(userToCreate)
//         .expect(400);

//       expect(body).toHaveProperty("message");
//       expect(body).toHaveProperty("error");
//       expect(body.message).toBe(errorMessage);
//     });
//   });

//   describe("When it receives a post request with a new user", () => {
//     test("Then it should respond with a message `Usuari Danae s'ha registrat correctament`", async () => {
//       const userToCreate = {
//         nom: "Marc",
//         usuari: "Danae",
//         contrassenya: "marc1990",
//         telefon: "123456789",
//       };

//       const Message = `Usuari ${userToCreate.usuari} s'ha registrat correctament`;

//       const { body } = await request(app)
//         .post("/usuari/register")
//         .send(userToCreate);

//       expect(body).toHaveProperty("message");
//       expect(body.message).toBe(Message);
//     });
//   });
// });
