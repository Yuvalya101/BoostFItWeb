import app from "../app";
import connectToDatabase from "../database";
import request from "supertest";
import UserModel from "../models/user.model";
import PostModel from "../models/post.model";

describe("GET /posts", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
    await PostModel.deleteMany({});
    await UserModel.deleteMany({});
  });
  it("returns status code 200 if posts are fetched successfully", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toEqual(200);
  });
  it("returns an array of posts if posts are fetched successfully", async () => {
    const res = await request(app).get("/posts");
    expect(res.body.data).toEqual([]);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});
let token: string;
let userId: string;
describe("POST /posts", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
    // Clear Users in database before testing
    await PostModel.deleteMany({});
    await UserModel.deleteMany({});
  });
  it("returns status code 201 if post is created successfully", async () => {
    let res = await request(app).post("/auth/register").send({
      email: "test@gmail.com",
      password: "123456Aa!",
      name: "test",
    });
    res = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "123456Aa!",
    });
    token = res.body.data;
    res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send();
    userId = res.body.data._id;
    res = await request(app)
      .post("/posts")
      .send({
        title: "test",
        content: "test",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});

describe("GET /posts/user", () => {
  let connection: typeof import("mongoose");
  beforeAll(async () => {
    connection = await connectToDatabase(true /* In test mode */);
  });
  it("returns status code 200 if user posts fetched successfully", async () => {
    let res = await request(app).get(`/posts/user/${userId}}`).send();
    expect(res.statusCode).toEqual(200);
  });
  it("returns an array with 1 post if user posts fetched successfully", async () => {
    let res = await request(app).get(`/posts/user/${userId}}`).send();
    expect(res.body.data.length).toEqual(1);
  });

  afterAll(async () => {
    if (connection) await connection.disconnect();
  });
});
