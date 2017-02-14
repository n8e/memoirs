import Memoir from '../models/memoirs';

export function getAllMemoirs() {
	let promise = Memoir.find({}).exec();

	return promise.then(response => {
		const memoirs = response.map(memoir => {
			return {
				id: memoir._id,
				memoirId: memoir._id,
				title: memoir.title,
				content: memoir.content,
			};
		});
		return { memoirs };
	}).catch(err => {
		return new Error(err);
	});
}
