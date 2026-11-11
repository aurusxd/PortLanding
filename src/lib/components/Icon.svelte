<script lang="ts">
	type Name =
		| 'arrow-up-right'
		| 'arrow-right'
		| 'telegram'
		| 'whatsapp'
		| 'plus'
		| 'close'
		| 'area'
		| 'clock'
		| 'camera'
		| 'check'
		| 'upload'
		| 'brief'
		| 'refs'
		| 'draft'
		| 'edit'
		| 'final'
		| 'chevron-left'
		| 'chevron-right'
		| 'drag'
		| 'grid';
	let { name, class: cls = 'size-5' }: { name: Name; class?: string } = $props();
</script>

<svg viewBox="0 0 24 24" class={cls} fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
	{#if name === 'arrow-up-right'}
		<path d="M7 17 17 7M8 7h9v9" />
	{:else if name === 'arrow-right'}
		<path d="M4 12h16M14 6l6 6-6 6" />
	{:else if name === 'telegram'}
		<path d="M21.5 4.5 2.8 11.7c-.8.3-.8 1.4 0 1.7l4.6 1.6 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.5 4.8 3.5c.6.4 1.4.1 1.6-.6L22.9 5.9c.2-.9-.6-1.7-1.4-1.4Z" fill="currentColor" stroke="none" />
		<path d="m9.2 14.8 8.3-6.6" stroke="var(--tg-cut, #fff)" stroke-width="1.3" />
	{:else if name === 'whatsapp'}
		<path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.3-4.3a8.5 8.5 0 1 1 15.7-4.4Z" />
		<path d="M9 8.5c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.6l-.5.6c-.1.2-.2.4 0 .6.7 1.2 1.6 2 2.8 2.6.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .5-.2 1.1-.6 1.4-.5.4-1.3.6-2.1.4-1.8-.5-3.4-1.6-4.6-3.1-.8-1-1.4-2.1-1.4-3.2 0-.8.2-1.4.6-1.8Z" fill="currentColor" stroke="none" />
	{:else if name === 'plus'}
		<path d="M12 5v14M5 12h14" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6 6 18" />
	{:else if name === 'area'}
		<path d="M6 3v13a2 2 0 0 0 2 2h13M3 6h13a2 2 0 0 1 2 2v13" />
	{:else if name === 'clock'}
		<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />
	{:else if name === 'camera'}
		<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" /><circle cx="12" cy="13" r="3.2" />
	{:else if name === 'check'}
		<path d="m5 12.5 4.5 4.5L19 7.5" />
	{:else if name === 'upload'}
		<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 15v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
	{:else if name === 'brief'}
		<path d="M8 4h8M7 4.5H6a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-1M8 11h8M8 15h5" />
	{:else if name === 'refs'}
		<rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><circle cx="17" cy="17" r="3.5" />
	{:else if name === 'draft'}
		<path d="M3.5 20.5h17M5 20.5V9l7-5 7 5v11.5M9 20.5v-6h6v6" />
	{:else if name === 'edit'}
		<path d="M14.5 5.5 18.5 9.5M4 20l1-4.5L15.8 4.7a1.8 1.8 0 0 1 2.5 0l1 1a1.8 1.8 0 0 1 0 2.5L8.5 19Z" />
	{:else if name === 'final'}
		<path d="M12 3.5 14.6 9l5.9.7-4.4 4 1.2 5.8L12 16.6l-5.3 2.9 1.2-5.8-4.4-4L9.4 9Z" />
	{:else if name === 'chevron-left'}
		<path d="m14.5 6-6 6 6 6" />
	{:else if name === 'chevron-right'}
		<path d="m9.5 6 6 6-6 6" />
	{:else if name === 'drag'}
		<path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
	{:else if name === 'grid'}
		{#each [6, 12, 18] as y (y)}
			{#each [6, 12, 18] as x (x)}
				<circle cx={x} cy={y} r="1.3" fill="currentColor" stroke="none" />
			{/each}
		{/each}
	{/if}
</svg>
