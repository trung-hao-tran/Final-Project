const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server'); // Adjust the path accordingly
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Bid = require('../models/bidModel');
const Message = require('../models/messageModel');


//----------------tests for users----------------
let authorization;
let userId;

describe("signup a user", () => {
  test("give the personal information", async () => {
    const res = await request(app).post("/api/user/signup").send({
      email: "test10@test10.com",
      password: "Comp9900test!",
      name: "test",
      address: "test",
      phone: "12345",
    })
    console.log(res.body)
    expect(res.statusCode).toBe(200)
  })
})

describe("login a user", () => {
  test("give the personal information", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test10@test10.com",
      password: "Comp9900test!"
    })
    console.log(res.body)
    authorization = "Bearer " + res.body.token;
    userId = res.body._id;
    expect(res.statusCode).toBe(200)
  })
})


describe("update user profile", () => {
  test("get token and query", async () => {
    console.log("auth:", authorization)
    const res = await request(app).put("/api/user/profile").set("authorization", authorization).send({
      name: "changed",
    })
    console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("name", "changed");
  })
})

//----------------Task test----------------
let taskId;

describe("create a task", () => {
  test("provide task details", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("authorization", authorization)
      .send({
        title: "Test Task",
        description: "Finish the project on time",
        time: {
          "start": "2023-11-01T08:00:00.000Z",
          "end": "2023-11-02T17:00:00.000Z"
        },
        frequency: "Once",
        price: 100
      });

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Test Task");
    taskId = res.body._id; // Save the taskId for later use
  });
});

describe("get tasks", () => {
  test("retrieve all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

//----------------Bid Test----------------
let bidId;

describe("create a bid", () => {
  test("provide bid details", async () => {
    const res = await request(app)
      .post("/api/bid")
      .set("authorization", authorization)
      .send({
        description: "Bid description",
        task_id: taskId, // Use the taskId created in the previous test
      });

    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.data.bid).toHaveProperty("description", "Bid description");
    bidId = res.body._id; // Save the bidId for later use
  });
});

describe("get bids", () => {
  test("retrieve all bids of a task", async () => {
    const res = await request(app).get("/api/bid").send({
      id : taskId,
      sort: "createdAt:desc"
    });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

//----------------tests for messages----------------
let messageId;
let receiverId;

describe("send a message", () => {
  test("provide message details", async () => {
    const new_user_res = await request(app).post("/api/user/signup").send({
      email: "test11@test11.com",
      password: "Comp9900test!",
      name: "test",
      address: "test",
      phone: "12345",
    })
    const log_user_res = await request(app).post("/api/user/login").send({
      email: "test11@test11.com",
      password: "Comp9900test!"
    })
    receiverId = log_user_res.body.userId
    console.log(log_user_res.body)

    const res = await request(app)
      .post("/api/messages/send")
      .set("authorization", authorization)
      .send({
        receiverId, // Replace with an actual user ID
        messageText: "Test message",
      });

    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("messageText", "Test message");
    messageId = res.body._id; // Save the messageId for later use
  });
});

describe("get messages", () => {
  test("retrieve all messages", async () => {
    const res = await request(app).get("/api/messages/getMessages").set("authorization", authorization);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

//------------------------------------------------
// After all tests have ran, perform cleanup
afterAll(async () => {
  // Use a try-catch block to handle errors during cleanup
  try {
    // Remove the user from the database
    await User.findOneAndDelete({"email": "test10@test10.com"})
    await User.findOneAndDelete({"email": "test11@test11.com"})
    await Task.findOneAndDelete({"title": "Test Task"})
    await Bid.findOneAndDelete({"description": "Bid description"})
    await Message.findOneAndDelete({"messageText": "Test message"})

    // Add any additional cleanup steps if needed

  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});
//--------------------------------------------------

