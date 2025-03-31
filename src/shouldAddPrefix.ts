export default function shouldAddPrefix(url: string) {
	const prefix = import.meta.env.VITE_PREFIX;

	return prefix + url;
}
