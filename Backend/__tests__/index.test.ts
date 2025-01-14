import app from "../app";
import connectToDatabase from "../database";
import request from "supertest";
import UserModel from "../models/user.model";

describe("POST /auth/register", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
    await UserModel.deleteMany({});
  });
  it("returns status code 201 if register succeeds", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@gmail.com",
      password: "123456Aa!",
      name: "test",
    });
    expect(res.statusCode).toEqual(201);
  });
  it("returns status code 400 if email already exists", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@gmail.com",
      password: "123456Aa!",
      name: "test",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("returns status code 400 if password is not long enough", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@gmail.com",
      password: "1234",
      name: "test",
    });
    expect(res.statusCode).toEqual(400);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});
let token: string;
describe("POST /auth/login", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
  });
  it("returns status code 200 if login succeeds", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "123456Aa!",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("returns access token if login succeeds", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "123456Aa!",
    });
    expect(typeof res.body.data).toEqual("string");
    token = res.body.data;
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});

describe("GET /auth/me", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
  });
  it("returns status code 200 if user details fetch succeeds", async () => {
    const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});

describe("PUT /auth", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
  });
  it("returns status code 200 if user details update succeeds", async () => {
    const res = await request(app).put("/auth").set("Authorization", `Bearer ${token}`).send({
      name: "Hagit",
    });
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});

describe("DELETE /auth", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
  });
  it("returns status code 200 if user is deleted successfully", async () => {
    const res = await request(app).delete("/auth").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});
