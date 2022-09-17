import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import UserService from '../services/user.service';
import { CreateUserRequestBody } from '../types';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userInfoToCreate = req.body as CreateUserRequestBody;

    const userServiceInstance = Container.get(UserService);
    const { id, createdAt, updatedAt } = await userServiceInstance.createUser(userInfoToCreate);

    res.status(201).json({ id, createdAt, updatedAt });
  } catch (e) {
    next(e);
  }
};
