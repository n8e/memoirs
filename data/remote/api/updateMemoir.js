import Memoir from '../models/memoirs';

export function updateMemoir(args) {
	console.log('args', args);
	return args;
  // TODO: Include the req.decoded.id as part of the memoir object "ownerId"
	// let updatedMemoir = new Memoir({
	// 	title: args.title,
	// 	content: args.content,
	// });
  //
  // let promise = Memoir.find({"_id": args.memoirId}).exec();
  //
  // promise
  //   .then(response => {
  //     if(!response) {
  //       throw { 'status': 404, 'message': 'Memoir not Found!' };
  //     }
  //
  //     let p = Memoir.findOneAndUpdate({"_id": args.memoirId}, updatedMemoir, updatedMemoir).exec();
  //
  //     p.then(resp => {
  //       console.log('ULTIMATE resp', resp);
  //       return { memoir: resp };
  //     })
  //     .catch(err => new Error(err));
  //   })
  //   .catch(err => new Error(err));
}
