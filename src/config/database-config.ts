import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const databaseConfigList = {
	development: {
		type: 'mysql',
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PWD,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: true,
		timezone: 'z',
	},
	test: {
		type: 'mysql',
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PWD,
		database: process.env.DB_NAME,
		synchronize: false,
		logging: false,
		timezone: 'z',
	},
	production: {
		type: 'mysql',
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PWD,
		database: process.env.DB_NAME,
		synchronize: false,
		logging: false,
		timezone: 'z',
	},
};

export default databaseConfigList;
