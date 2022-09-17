import * as typedi from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

const connect = async (): Promise<{ connection: Connection }> => {
  useContainer(Container);
  const connection = await createConnection();
  await connection.synchronize();

  typedi.Container.set('connection', connection);

  return { connection };
};

export default connect;
