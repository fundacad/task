const supertest = require("supertest");
const { app } = require("../project/backend_API/index.js");

describe("PUT /update", () => {
    describe("given valid Customer info for existing customer", () => {
        test ("should respond with status code 200 and customer info matching changes", async () => {
            const newInfo = {
                _id: isObjectIdOrHexString("14fq0a7a0a8f97f0a"),//make sure this document is in the database
                name: "abc",
                address: "defg",
                mobileNum: "961 81 456 734"
            }

            const response = await supertest(app).post(`/update/${newInfo._id}`).send(newInfo);

            console.log(response.data);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("_id", newInfo._id); 
            expect(response.body).toHaveProperty("name", newInfo.name);
            expect(response.body).toHaveProperty("address", newInfo.address);
            expect(response.body).toHaveProperty("mobileNum", newInfo.mobileNum);
        })
    },100000) 
    describe("given nonvalid Customer info for existing customer", () => {
        test("should respond with 400 status code and json containing the error", async () => {

            const newInfo = {
                _id: isObjectIdOrHexString("14fq0a7a0a8f97f0a"),//make sure this document is in the database
                name: "abc",
                address: "",
                mobileNum: "961 8 988"
            };


            const response = await supertest(app).post(`/update/${newInfo._id}`).send(newInfo);


            console.log(response.data);
            expect(response.statusCode).toBe(400);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("error"); 
        },100000)
    })
    describe("Attempting to modify non existing customer", () => {
        test("should respond with 404 status code and json containing the error",async () => {
            const newInfo = {
                _id: isObjectIdOrHexString("23eq0rr230af8f97f0a"),//make sure this document is not in the database
                name: "abc",
                address: "",
                mobileNum: "961 8 988"
            };


            const response = await supertest(app).post(`/update/${newInfo._id}`).send(newInfo);


            console.log(response.data);
            expect(response.statusCode).toBe(404);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty("error"); 
        },100000)
    } )
})