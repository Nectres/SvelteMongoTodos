import { todos } from '$src/lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const content = url.searchParams.get('content');
	if (!content) return new Response('Missing required param', { status: 400 });
	let { acknowledged, insertedId } = await todos.insertOne({ created_on: new Date(), content });
	if (!acknowledged)
		return new Response('Failed to insert the document in the MongoDB Server', { status: 500 });
	return new Response(insertedId.toString());
}
