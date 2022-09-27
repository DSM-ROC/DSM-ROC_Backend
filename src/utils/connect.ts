import { Connection, createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

const connect = async (): Promise<{ connection: Connection }> => {
  useContainer(Container);
  const connection = await createConnection();
  await connection.synchronize();

  return { connection };
};

export { connect };
