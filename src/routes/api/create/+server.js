import { todos } from '$src/lib/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ url, request }) {
	const body = await request.json();
	if (!body) return new Response('Missing required param', { status: 400 });
	let { acknowledged, insertedId } = await todos.insertOne(body);
	if (!acknowledged)
		return new Response('Failed to insert the document in the MongoDB Server', { status: 500 });
	return new Response(insertedId.toString());
}
