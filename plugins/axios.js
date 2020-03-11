export default function({ $axios }){
	$axios.onRequest(( config ) => {		
		//console.log("process.env.QIITA_TOKEN in axios.js");
		//console.log(process.env.QIITA_TOKEN);
		if( process.env.QIITA_TOKEN ){			
			config.headers.common['Authorization'] = `Bearer ${process.env.QIITA_TOKEN}`;
		}		
		return config;
	})
}