export class HttpError extends Error {
	public statusCode: number;

	public message: string;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
	}
}

export class UnAuthorizedError extends HttpError {
	constructor(message = 'Unauthorized') {
		super(401, message);
	}
}

export class ConflictError extends HttpError {
	constructor(message = 'Conflict') {
		super(409, message);
	}
}

export class ExpiredTokenError extends HttpError {
	constructor(message = 'Expired Token') {
		super(401, message);
	}
}

export class ForbiddenError extends HttpError {
	constructor(message = 'Forbidden Request') {
		super(403, message);
	}
}

export class NotFoundURLError extends HttpError {
	constructor(url: string) {
		super(404, `Not Found ${url}`);
	}
}

export class NotFoundError extends HttpError {
	constructor(message = 'Not Found') {
		super(404, message);
	}
}

export class BadRequestError extends HttpError {
	constructor(message = 'Bad Request') {
		super(400, message);
	}
}

export class InternalServerError extends HttpError {
	constructor() {
		super(500, 'Interal Server Error');
	}
}
