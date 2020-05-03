export default function({ $axios, store }){

	$axios.onRequest(( config ) => {				
		console.log("config");
	    console.log(config);
		if( process.env.QIITA_TOKEN && store.state.persistedParameter.usedAPI === "qiita"){					
			config.headers.common['Authorization'] = `Bearer ${process.env.QIITA_TOKEN}`;
		}
		return config;
	});

	/*
	//参考：https://axios.nuxtjs.org/extend.html
	$axios.onError(error => {
	    console.log("error");
	    console.log(error);
	    //store.dispatch('persistedParameter/APIErrorSetAction');
	    store.dispatch('APIErrorSetAction',true);
	    return;
	});

	$axios.onResponse(response => {
		console.log("response");
	    console.log(response);
	    console.log("response.status");
	    console.log(response.status);
	    
	});
	*/



}