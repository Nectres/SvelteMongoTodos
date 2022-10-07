<script lang="ts">
	import { randomArrayIndex } from '$src/lib/utils';
	// import Icon from "svelte-fa"

	export let data: { todos: Todo[] };

	let showLogin = false;
	let newTodo = '';

	const color = ['orange', 'lightblue', 'coral', 'lightgreen', 'lightyellow', 'lightgray'];
	const fontColor = ['brown', 'darkblue', 'lightred', 'darkgreen', 'orange', 'black'];

	interface Todo {
		content: string;
		status: 'open' | 'finished';
		_id: string;
		colorIndex: number;
		created_on: Date;
	}

	let { todos } = data;

	async function toggleStatus(index: number) {
		let todo = todos[index];
		if (todo.status == 'open') todo.status = 'finished';
		else todo.status = 'open';
		todos[index] = todo;
		await fetch(`/api/update?id=${todo._id}&status=${todo.status}`);
	}

	async function pruneList() {
		todos = todos.filter((t) => t.status != 'finished');
		await fetch('/api/prune/');
	}

	async function addTodo() {
		let todo = {
			colorIndex: randomArrayIndex(color),
			content: newTodo,
			created_on: new Date(),
			status: 'open'
		} as Record<string, any>;
		let resp = await fetch('/api/create', {
			body: JSON.stringify(todo),
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		let _id = await resp.text();
		todo._id = _id;
		todos[todos.length] = todo as Todo;
		newTodo = '';
	}
	// console.log(todos[1].created_on);
</script>

<svelte:head>
	<title>Todos | Svelte</title>
	<script src="https://kit.fontawesome.com/36d7497375.js" crossorigin="anonymous"></script>
	<link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
</svelte:head>

<div>
	<div class="bg-slate-900 text-white pb-8 pt-4 text-center">
		<h1 class="font-black text-3xl my-4">todos</h1>
		<p class="text-sm text-gray-200">The best way to manage your day.</p>
	</div>
	<div class="flex flex-wrap gap-8 items-center justify-center my-20 mx-20 h-full">
		{#each todos as todo, index}
			<div
				on:click={(_) => toggleStatus(index)}
				style={`
					background-color: ${color[todo.colorIndex]};
					color: ${fontColor[todo.colorIndex]};
					font-weight: 900;
					border: 3px solid ${fontColor[todo.colorIndex]};
					opacity: ${todo.status == 'finished' ? 40 : 100};`}
				class="px-6 border-4 py-4 rounded-lg transition-transform ease-linear text-xl hover:scale-110 cursor-pointer"
			>
				{#if todo.status == 'finished'}
					<s>{todo.content}</s>
				{:else}
					<span>{todo.content}</span>
				{/if}
			</div>
		{/each}
	</div>
	<form
		on:submit|preventDefault
		class="flex items-center gap-0 rounded-lg fixed justify-center bottom-10 left-1/3"
	>
		{#if todos.some((t) => t.status == 'finished')}
			<button on:click={pruneList} class="bg-green-800 text-white btn btn-green">
				<i class="fa fa-check" /></button
			>
		{/if}
		<input
			type="text"
			bind:value={newTodo}
			placeholder="Something important..."
			class="border-2 w-96 px-2 py-2 border-gray-700 rounded-lg"
		/>
		<button on:click={addTodo} type="submit" class="btn mx-0"> <i class="fa fa-plus" /> </button>
	</form>
</div>

<style>
	.btn {
		@apply mx-2 px-3 py-2 bg-black border-black border-2 rounded-lg text-white transition-transform hover:scale-105 ease-linear;
	}

	.btn-green {
		@apply bg-green-800;
	}
</style>
