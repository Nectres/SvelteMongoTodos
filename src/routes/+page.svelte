<script lang="ts">
	export let data: { todos: Todo[] };

	interface Todo {
		content: string;
		finished: boolean;
		_id: string;
		created_on: Date;
	}

	let { todos } = data;
	// console.log(todos[1].created_on);
</script>

<div class="flex gap-4">
	{#each todos as t}
		<span class="">{t.content}</span>
	{/each}
</div>
