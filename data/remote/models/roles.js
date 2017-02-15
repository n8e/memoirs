import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RolesSchema = new Schema({
	id: {
		type: Number,
		unique:true
	},
	title: {
		type: String,
		enum: ['Administrator', 'User'],
		default: 'User',
		unique: true
	}
});

export default mongoose.model('Roles', RolesSchema);
