/* eslint-disable */
import firebase from 'firebase'
export default function ({ store, redirect }) {	

	return new Promise((resolve) => {

		firebase.auth().onAuthStateChanged(function (user) {

			if(user){				
			    store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);
			    return resolve();
			}			

			return redirect('/');			
		});
	});  
}