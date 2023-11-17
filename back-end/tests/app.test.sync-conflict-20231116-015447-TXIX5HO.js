const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server'); // Adjust the path accordingly
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Bid = require('../models/bidModel');


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
    expect(res.statusCode).toBe(201);
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
      .set("taskId", taskId)
      .send({
        description: "Bid description",
        task_id: "taskId", // Use the taskId created in the previous test
      });

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("description", "Bid description");
    bidId = res.body._id; // Save the bidId for later use
  });
});

describe("get bids", () => {
  test("retrieve all bids", async () => {
    const res = await request(app).get("/api/bid");
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

//----------------tests for messages----------------
let messageId;

describe("send a message", () => {
  test("provide message details", async () => {
    const res = await request(app)
      .post("/api/messages/send")
      .set("authorization", authorization)
      .set("userId", userId)
      .send({
        receiverId: "userId", // Replace with an actual user ID
        messageText: "Test message",
      });

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("messageText", "Test message");
    messageId = res.body._id; // Save the messageId for later use
  });
});

describe("get messages", () => {
  test("retrieve all messages", async () => {
    const res = await request(app).get("/api/messages/getMessages");
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

//------------------------------------------------
// After all tests have run, perform cleanup
afterAll(async () => {
  // Use a try-catch block to handle errors during cleanup
  try {
    // Remove the user from the database
    await User.findOneAndDelete({"email": "test10@test10.com"})

    // Add any additional cleanup steps if needed

  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});
//--------------------------------------------------

// // Helper function to create a test user in the database
// const createTestUser = async () => {
//   return User.create({
//     name: 'Test User',
//     email: 'test@example.com',
//     password: 'testpassword',
//     address: 'Test Address',
//     phone: '1234567890',
//   });
// };

// // Helper function to create a test task in the database
// const createTestTask = async (userId) => {
//   return Task.create({
//     title: 'Test Task',
//     description: 'Test Description',
//     time: {
//       start: new Date(),
//       end: new Date(),
//     },
//     frequency: 'Once',
//     price: 100,
//     user_id: userId,
//   });
// };

// // Helper function to create a test bid in the database
// const createTestBid = async (userId, taskId) => {
//   return Bid.create({
//     description: 'Test Bid',
//     user_id: userId,
//     task_id: taskId,
//   });
// };

// // Clear the database after each test
// afterEach(async () => {
//   await User.deleteMany();
//   await Task.deleteMany();
//   await Bid.deleteMany();
// });

// describe('User Controller', () => {
//   it('should sign up a new user', async () => {
//     const mockUserData = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'testpassword',
//       address: '123 Main St',
//       phone: '9876543210',
//     };

//     const response = await request(app)
//       .post('/api/user/signup')
//       .send(mockUserData)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('email', mockUserData.email);
//     expect(response.body).toHaveProperty('token');
//   });

//   it('should log in an existing user', async () => {
//     const testUser = await createTestUser();

//     const mockLoginData = {
//       email: testUser.email,
//       password: 'testpassword',
//     };

//     const response = await request(app)
//       .post('/api/user/login')
//       .send(mockLoginData)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('userId');
//     expect(response.body).toHaveProperty('token');
//   });

//   // Add more test cases for other userController functions if needed
// });

// describe('Task Controller', () => {
//   it('should create a new task', async () => {
//     const testUser = await createTestUser();

//     const mockTaskData = {
//       title: 'Test Task',
//       description: 'Test Description',
//       time: {
//         start: new Date(),
//         end: new Date(),
//       },
//       frequency: 'Once',
//       price: 100,
//     };

//     const response = await request(app)
//       .post('/api/tasks')
//       .set('Authorization', `Bearer ${testUser.generateAuthToken()}`)
//       .send(mockTaskData)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('title', mockTaskData.title);
//     expect(response.body).toHaveProperty('user_id', testUser._id.toString());
//   });

//   it('should get all tasks', async () => {
//     const testUser = await createTestUser();
//     const testTask = await createTestTask(testUser._id);

//     const response = await request(app)
//       .get('/api/tasks')
//       .set('Authorization', `Bearer ${testUser.generateAuthToken()}`)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body[0]).toHaveProperty('title', testTask.title);
//   });

//   // Add more test cases for other taskController functions if needed
// });

// describe('Bid Controller', () => {
//   it('should create a new bid', async () => {
//     const testUser = await createTestUser();
//     const testTask = await createTestTask(testUser._id);

//     const mockBidData = {
//       description: 'Test Bid',
//       task_id: testTask._id.toString(),
//     };

//     const response = await request(app)
//       .post('/api/bid')
//       .set('Authorization', `Bearer ${testUser.generateAuthToken()}`)
//       .send(mockBidData)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('description', mockBidData.description);
//     expect(response.body).toHaveProperty('user_id', testUser._id.toString());
//   });

//   it('should get all bids for a task', async () => {
//     const testUser = await createTestUser();
//     const testTask = await createTestTask(testUser._id);
//     const testBid = await createTestBid(testUser._id, testTask._id);

//     const response = await request(app)
//       .get(`/api/bid/${testTask._id}`)
//       .set('Accept', 'application/json');

//     expect(response.status).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body[0]).toHaveProperty('description', testBid.description);
//   });

//   // Add more test cases for other bidController functions if needed
// });
