import Memoir from '../models/memoirs';

export function getMemoirById(args) {
	let promise = Memoir.find({ '_id': args.memoirId }).exec();

	return promise.then(response => {
		if (response === []) {
			throw {status: 404, message: 'Memoir not found' };
		} else {
			const oneMemoir = {
				id: response[0]._id,
				memoirId: response[0]._id,
				title: response[0].title,
				content: response[0].content,
			};
			return oneMemoir;
		}
	}).catch(err => {
		return new Error(err);
	});
}
