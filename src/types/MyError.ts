export default class MyError extends Error {
	constructor(msg: string, status: number) {
		super(msg);
		this.status = status;
	}
}
