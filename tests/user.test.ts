import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import userFactory from "./factories/userFactory.js";
import userBodyFactory from "./factories/userBodyFactory.js";

describe("User controller", () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe("POST /sign-up", () => {
        it("should return 201 and persist the user given a valid body", async () => {
            const user = userBodyFactory();

            const response = await supertest(app).post('/sign-up').send(user);
            const createUser = await prisma.user.findUnique({
                where: { email: user.email},
            });

            expect(response.status).toEqual(201);
            expect(createUser).not.toBeNull();
        });

        it("should return 422 given an invalid body", async () => {
            const user = {};

            const response = await supertest(app).post('/sign-up').send(user);
            const usersCount = await prisma.user.count();

            expect(response.status).toEqual(422);
            expect(usersCount).toEqual(0);
        });
        
        it("should return 409 given a duplicate email", async () => {
            const user = userBodyFactory();

            await prisma.user.create({
                data: user
            });

            const response = await supertest(app).post('/sign-up').send(user);
            const usersWithSameEmail = await prisma.user.findMany({
                where: { email: user.email},
            });

            expect(response.status).toEqual(409);
            expect(usersWithSameEmail.length).toEqual(1);
        });
    });

    describe("POST /login", () => {
        it("should return 200 and a token given valid credentials", async () => {
            const user = userBodyFactory();
            await userFactory(user);

            const response = await supertest(app).post('/login').send(user);

            expect(response.status).toEqual(200);
        })
        
        it("should return 422 given a schema invalid body", async () => {
            const user = {};
            
            const response = await supertest(app).post('/login').send({...user, password: '123'});

            expect(response.status).toEqual(422);

        })       

    })

})