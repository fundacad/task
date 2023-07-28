const supertest = require("supertest");
const { app } = require("../project/backend_API/index.js");

describe("POST /add", () => {
    describe("given valid customer info", () => {
        test("should respond with 200 status code and json object containing id", async () => {

            const newCustomer = {
                name: "abc",
                address: "defg",
                mobileNum: "961 81 678 988"
            };


            const response = await supertest(app).post("/add").send(newCustomer);


            console.log(response.data);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("_id"); 
            expect(response.body).toHaveProperty("name", newCustomer.name);
            expect(response.body).toHaveProperty("address", newCustomer.address);
            expect(response.body).toHaveProperty("mobileNum", newCustomer.mobileNum);
        },100000)
    })

    describe("given non valid cutomer info", ()=> {
        test("should respond with 400 status code and json containing the error", async () => {

            const newCustomer = {
                name: "abc",
                address: "",
                mobileNum: "961 8 988"
            };


            const response = await supertest(app).post("/add").send(newCustomer);


            console.log(response.data);
            expect(response.statusCode).toBe(400);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("error"); 
        },100000)
    })
})
