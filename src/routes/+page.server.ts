import { error } from '@sveltejs/kit';
import { todos } from '$src/lib/db';

export async function load() {
	const todosArr = await todos.find().toArray();
	let todosArray = todosArr.map((doc) => {
		return { ...doc, _id: doc._id.toHexString() };
	});
	return {
		todos: todosArray
	};
}
