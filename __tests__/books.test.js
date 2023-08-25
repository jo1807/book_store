const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();
const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST;

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI_TEST);

  await request(app).post("/api/books").send({
    name: "Lord of the Rings",
    author: 'J.R.R Tolkien',
    genre: "fantasy",
  });

  await request(app).post("/api/books").send({
    name: "The Shining",
    author: 'Stephen King',
    genre: "horror",
  });
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("GET /api/books", () => {
  it("should return all books", async () => {
    await request(app)
		.get("/api/books")
		.expect(200)
		.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(2)
			expect(response.body[0].name).toBe('Lord of the Rings')
			expect(response.body[1].name).toBe('The Shining')
		})
  });
});

describe("GET /api/books/:id", () => {
  it("should return a book by id", async () => {
    const bookData = await request(app).get("/api/books");
    const id = bookData.body[0]._id;
    const res = await request(app).get(
      `/api/books/${id}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Lord of the Rings");
    expect(res.body._id).toBe(id);
  });
});

describe("GET /api/books/genre/:genre", () => {
  it("should return a books by genre ", async () => {
    const res = await request(app).get("/api/books/genre/fantasy");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Lord of the Rings");
    expect(res.body[0].genre).toBe("fantasy");
  });
});

describe("POST /api/books", () => {
  it("should create a book", async () => {
    const res = await request(app).post("/api/books").send({
      name: "Harry Potter",
      author: 'JK Rowling',
      genre: "fantasy",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Harry Potter");
    expect(res.body.author).toBe('JK Rowling');
    expect(res.body.genre).toBe("fantasy");
  });
});

describe("PATCH /api/books/:id", () => {
  it("should update a book", async () => {
    const bookData = await request(app).get("/api/books");
    const id = bookData.body[1]._id;
    const res = await request(app).patch(
      `/api/books/${id}`
    ).send({
        name: 'Pet Sematary',
        author: bookData.body[1].author,
        genre: bookData.body[1].genre,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Pet Sematary');
    expect(res.body._id).toBe(id);
  });
});

describe("DELETE /api/products/:id", () => {
  it("should delete a product", async () => {
    const bookData = await request(app).get("/api/books");
    const id = bookData.body[0]._id;
    const res = await request(app).delete(
      `/api/books/${id}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(id);

    const response = await request(app).get(`/api/books/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(null);
  });
});