const supertest = require("supertest");
const { app } = require("../project/backend_API/index.js");

describe("DELETE /delete", () => {
    describe("given that we have the databse set up and populated", () => {
        test('should respond with 200 status code and json containing the message',async () => {
            const response = await request.delete(`/delete/${newInfo._id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("message");
        },100000)
    })
    describe("given we encounter a problem with the databse", () => {
        test("should respond with 400 status code and json containing the error", async () => {
            const response = await request.delete(`/delete/${newInfo._id}`);

            expect(response.statusCode).toBe(400);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("error");
        },100000)
    })
})