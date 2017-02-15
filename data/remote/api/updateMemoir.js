import decode from 'jwt-decode';
import Memoir from '../models/memoirs';

export function updateMemoir(args) {
	const tokenValues = decode(args.token)._doc;
	let promise = Memoir.find({'_id': args.memoirId}).exec();

	return promise.then(response => {
		if (!response) {
			throw {'status': 404, 'message': 'Memoir not Found!'};
		}
		// update if role is administrator or ownerId is same as decoded id
		if (tokenValues._id !== response.ownerId &&
			tokenValues.role === 'User') {
				// send 403 status and forbidden message
			throw {'status': 403, 'message': 'Forbidden to update this document'};
		} else {
			let objectId = response[0]._id;
			return Memoir.findOneAndUpdate({'_id': objectId}, {
				title: args.title,
				content: args.content
			}, {
				new: true
			}).exec();
		}
	}).catch(err => new Error(err));
}
