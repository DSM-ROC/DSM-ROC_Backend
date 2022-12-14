import express, { Application } from 'express';
import { connectDatabase } from './connectDatabase';
import { loadExpress } from './express';

export const initApplication = async () => {
	await connectDatabase();
	const app: Application = express();
	loadExpress(app);
};
