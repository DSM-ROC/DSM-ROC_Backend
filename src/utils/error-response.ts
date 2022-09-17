interface ErrorResponseProps {
  statusCode: number;
  message: string;
}

export class ErrorResponse extends Error {
  isOperational: boolean;

  statusCode: number;

  stacks?: string;

  constructor({ message, statusCode }: ErrorResponseProps) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
