<script lang="ts">
	import { SITE_URL, site } from '#lib/config.ts';
	import { faq } from '#lib/data.ts';
	import Seo from '#lib/components/Seo.svelte';
	import Header from '#lib/components/Header.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import About from '#lib/components/About.svelte';
	import Portfolio from '#lib/components/Portfolio.svelte';
	import Services from '#lib/components/Services.svelte';
	import Calculator from '#lib/components/Calculator.svelte';
	import Process from '#lib/components/Process.svelte';
	import Pricing from '#lib/components/Pricing.svelte';
	import Reviews from '#lib/components/Reviews.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import Contact from '#lib/components/Contact.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Notch from '#lib/components/Notch.svelte';

	const jsonld = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfessionalService',
				'@id': `${SITE_URL}/#org`,
				name: site.name,
				description: site.description,
				url: SITE_URL,
				image: `${SITE_URL}/og.jpg`,
				logo: `${SITE_URL}/apple-touch-icon.png`,
				telephone: site.phone,
				email: site.email,
				priceRange: '4500–14000 ₽ за ракурс',
				address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Москва', addressCountry: 'RU' },
				openingHours: 'Mo-Fr 10:00-19:00',
				areaServed: 'RU',
				sameAs: site.socials.map((s) => s.href)
			},
			{
				'@type': 'FAQPage',
				mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
			}
		]
	};
</script>

<Seo {jsonld} />

<a href="#portfolio" class="sr-only z-[100] rounded-lg bg-sand px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
	Перейти к содержимому
</a>

<Header />

<Hero />

<main class="relative z-10">
	<About />
	<!-- Всё, что ниже, «наезжает» на липкий hero сплошным фоном -->
	<div class="relative bg-ink">
		<Portfolio />
		<Services />
		<Calculator />
		<Process />
		<Pricing />
		<div class="bg-ink px-2 sm:px-3">
			<div class="shell bg-bone text-ink [color-scheme:light]">
				<Notch fill="var(--color-bone)" dark={false} />
				<Reviews />
				<Faq />
				<Contact />
			</div>
		</div>
	</div>
</main>

<Footer />
