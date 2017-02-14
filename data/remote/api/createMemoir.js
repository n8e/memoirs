import Memoir from '../models/memoirs';

export function createMemoir(args) {
  // TODO: Include the req.decoded.id as part of the memoir object "ownerId"
	let memoir = new Memoir({
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
