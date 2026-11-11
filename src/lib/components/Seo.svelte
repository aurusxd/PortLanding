<script lang="ts">
	import { SITE_URL, site } from '#lib/config.ts';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		noindex?: boolean;
		jsonld?: Record<string, unknown>;
	}
	let { title = site.title, description = site.description, path = '/', noindex = false, jsonld }: Props = $props();

	const url = $derived(new URL(path, SITE_URL).href);
	const image = `${SITE_URL}/og.jpg`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#if noindex}<meta name="robots" content="noindex, follow" />{/if}

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{site.name} — студия 3D-визуализации интерьеров" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if jsonld}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>`}
	{/if}
</svelte:head>
