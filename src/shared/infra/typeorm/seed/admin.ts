import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection("localhost");

  const password = await hash("admin", 8);

  await connection.query(`INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
    values('${uuid()}', 'admin', 'admin@rentx.com.br', '${password}', true, now(), 'XXXXXXX')
  `);

  await connection.close();
}

create().then(() => console.log("user admin created"));
