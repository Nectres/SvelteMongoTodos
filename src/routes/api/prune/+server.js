import { todos } from '$src/lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let { acknowledged, deletedCount } = await todos.deleteMany({ status: "finished" });
    if (!acknowledged)
        return new Response("Failed to delete the records based on filter", {status:500})
    return new Response(`Sucessfully deleted ${deletedCount} record(s) from the database`)
}