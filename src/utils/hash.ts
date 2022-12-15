import bcrypt from 'bcrypt';

export const generateHash = (password: string): string => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

export const comparePassword = (hashedPw: string, password: string): boolean => {
	return (password && bcrypt.compareSync(password, hashedPw)) || false;
};
