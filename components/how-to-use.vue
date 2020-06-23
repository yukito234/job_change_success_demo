<template>
	<div class="section-container">
		<div class="h2title-area">
			<h2>
				このサイトでできる7つのこと
			</h2>
		</div>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				1
			</span>
			<h3 class="h3title">
				体験記を効率よく検索できる
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/search-w600px.png" />
		<p class="supplementary-explanation-paragraph">
			良質な体験記のあるドメインに検索対象を絞り、検索のヒントとなる単語を提供し、検索条件をインタイトル※に指定することで、転職成功者の体験記を効率よく検索できます。
			<br />※検索キーワードをすべてタイトルに含む記事を抽出します。
		</p>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				2
			</span>
			<h3 class="h3title">
				気になる記事を即ストックできる
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/stock.png" />
		<p class="supplementary-explanation-paragraph">
			タイトルを見て気になった記事は、すぐにブラウザに保存できます。
			<br />とりあえず記事情報だけストックしておいて後でまとめて読みたい人や、何度も読み返したい記事がある人におすすめの機能です。
		</p>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				3
			</span>
			<h3 class="h3title">
				転職成功者のデータがわかる
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/success-graph.png" />
		<p class="supplementary-explanation-paragraph">
			未経験から転職に成功した人のデータ※を把握できます。
			<br />※年齢・学歴・勉強期間・スクール有無・転職先
		</p>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				4
			</span>
			<h3 class="h3title">
				同じ志を持った仲間を見つけられる
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/members.png" />
		<p class="supplementary-explanation-paragraph">
			未経験からwebエンジニアを目指す人のプロフィールをチェックできます。
		</p>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				5
			</span>
			<h3 class="h3title">
				コメントを残せる
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/comment.png" />
		<p class="supplementary-explanation-paragraph">
			コメント機能により、気になるメンバーとコミュニケーションをとれます。
		</p>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				6
			</span>
			<h3 class="h3title">
				お気に入り記事を読める
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/check-like-article.png" />
		<p class="supplementary-explanation-paragraph">
			メンバーの紹介するおすすめの体験記をチェックできます。
		</p>
		<div class="function-explanation-title-area">
			<span class="function-explanation-number">
				7
			</span>
			<h3 class="h3title">
				おすすめ記事を紹介できる
			</h3>
		</div>
		<img class="seven-function-eye-catching-img" src="~/static/register-like-article.png" />
		<p class="supplementary-explanation-paragraph">
			あなたが参考になった体験記を他のメンバーに紹介できます。
		</p>
		<p id="call-to-action-paragraph">
			さあ、あなたも早速ログインして、未経験者と繋がろう！！
		</p>
		<p id="explanation-of-easy-signin">
			※簡単ログインを利用することで、会員登録することなく、ワンクリックでログインできますよ！
		</p>
		<b-button
			id="go-to-signin-button"
			class="button-with-gradation"
			variant="primary"
			@click="goToSigninPage()"
		>
			ログインページへ移動する
		</b-button>
	</div>
</template>

<script>
export default {
	methods: {
		goToSigninPage() {
			this.$router.push("/signin-signup");
		},
	},
};
</script>

<style scoped>
#explanation-of-easy-signin {
	text-align: center;
}

#call-to-action-paragraph {
	font-size: 24px;
	margin-top: 16px;
	text-align: center;
}
#go-to-signin-button {
	display: block;
	margin: 0 auto;
}

.seven-function-eye-catching-img {
	display: block;
	margin: 0 auto;
	max-width: 600px;
	width: 100%;
}

.function-explanation-number {
	background-color: #7db4e6;
	border-radius: 50%;
	color: white;
	display: block;
	font-size: 28px;
	height: 33px;
	line-height: 33px;
	margin-right: 7px;
	margin-top: 7px;
	text-align: center;
	width: 33px;
}

.function-explanation-title-area {
	display: flex;
}

.supplementary-explanation-paragraph {
	margin-left: 15px;
	margin-right: 15px;
	margin-top: 15px;
}
</style>
