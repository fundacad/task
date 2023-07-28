const supertest = require("supertest");
const { app } = require("../project/backend_API/index.js");
 

describe("GET /get-all", () => {
    describe("given that we have the databse set up and populated", () => {
        test('should respond with 200 status code and an array of customers',async () => {
            const response = await request.get('/get-all');

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        },100000)
    })
    describe("given we encounter a problem with the databse", () => {
        test("should respond with 500 status code and json containing the error", async () => {
            const response = await request.get('/get-all');

            expect(response.statusCode).toBe(500);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("error");
        },100000)
    })
})