const request = require("supertest");

const app = require("../src/app");

describe("Products API", () => {

    test("GET /api/products should return all products", async () => {

        const response = await request(app)
            .get("/api/products");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBeGreaterThan(0);
    });


    test("GET /api/products/1 should return product 1", async () => {

        const response = await request(app)
            .get("/api/products/1");

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("name", "Laptop");
        expect(response.body).toHaveProperty("price", 1200);
        expect(response.body).toHaveProperty("stock", 10);
    });


    test("GET /api/products/999 should return 404", async () => {

        const response = await request(app)
            .get("/api/products/999");

        expect(response.statusCode).toBe(404);

        expect(response.body).toEqual({
            error: "Product not found"
        });
    });

});
