import decode from 'jwt-decode';
import Memoir from '../models/memoirs';

export function createMemoir(args) {
	const tokenValues = decode(args.token)._doc;
	let memoir = new Memoir({
		ownerId: [tokenValues._id],
		title: args.title,
		content: args.content,
	});

	return memoir.save().then(res => {
		if(res) {
			return { memoir: res };
		} else {
			return { 'status': 500, 'message': 'Duplicate Record' };
		}
	});
}
