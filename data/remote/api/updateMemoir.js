import Memoir from '../models/memoirs';

export function updateMemoir(args) {
	let promise = Memoir.find({'_id': args.memoirId}).exec();

	return promise.then(response => {
		if (!response) {
			throw {'status': 404, 'message': 'Memoir not Found!'};
		}

		let objectId = response[0]._id;

		return Memoir.findOneAndUpdate({'_id': objectId}, {
			title: args.title,
			content: args.content
		}, {
			new: true
		}).exec();
	}).catch(err => new Error(err));
}
