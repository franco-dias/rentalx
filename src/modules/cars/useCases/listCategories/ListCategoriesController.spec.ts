import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
      values('${uuid()}', 'admin', 'admin@rentx.com.br', '${password}', true, now(), 'XXXXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const authResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const token = `Bearer ${authResponse.body.token}`;

    await request(app)
      .post("/categories")
      .send({
        name: "SuperTest Category",
        description: "Some description",
      })
      .set({
        Authorization: token,
      });

    const listResponse = await request(app).get("/categories");
    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0]).toHaveProperty("id");
    expect(listResponse.body[0].name).toBe("SuperTest Category");
  });
});
