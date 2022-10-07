import { todos } from '$src/lib/db';
import { ObjectId } from 'mongodb';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const id = url.searchParams.get('id');
	const status = url.searchParams.get('status');
	if (!id) return new Response("Missing required param 'id'", { status: 400 });
	let { modifiedCount } = await todos.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
    if (modifiedCount < 1)
        return new Response("Failed to update the record", { status: 500})
    return new Response("Sucessfully updated the record");
}
