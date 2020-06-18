import firebase from "firebase";
//export default function ({ store, redirect }) {
export default function ({ redirect }) {
	return new Promise((resolve) => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				return resolve();
			}
			return redirect("/");
		});
	});
}
