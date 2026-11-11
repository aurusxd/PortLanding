// Импорты картинок с набором ширин: `img.jpg?enhanced&w=1800;1280;860;560`
// (стандартная декларация пакета покрывает только `*?enhanced`)
declare module '*.jpg?enhanced&w=2560;1920;1280;828' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
declare module '*.jpg?enhanced&w=1800;1280;860;560' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
declare module '*.jpg?enhanced&w=160;112' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
