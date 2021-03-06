export default function ({ $axios, store }) {
	$axios.onRequest((config) => {
		if (process.env.QIITA_TOKEN && store.state.usedAPI === "qiita") {
			config.headers.common["Authorization"] = `Bearer ${process.env.QIITA_TOKEN}`;
		}
		return config;
	});
}
