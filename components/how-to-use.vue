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
		<!--
			<img id="" src="~/static/ifzvx-vdd03.gif" />
			<img class="gif-img" src="~/static/search.gif" />
		-->
		<img class="seven-function-eye-catching-img" src="~/static/search-w600px.png" />
		<p class="supplementary-explanation-paragraph">
			良質な体験記のあるドメインに検索対象を絞り、検索のヒントとなる単語を提供し、検索条件をインタイトル※に指定することで、転職成功者の体験記を効率よく検索できます。
			<br />※検索キーワードをすべてタイトルに含む記事を抽出します。
		</p>
		<!--
			良質な体験記のあるドメインに検索対象を絞り<br />検索のヒントとなる単語を提供し
			<br />検索条件をインタイトル※に指定することで
			<br />転職成功者の体験記を効率よく検索できます。
			<br />※検索キーワードをすべてタイトルに含む記事を抽出します。
			ドメインや検索条件※を指定し、検索のヒントとなる単語を提供することで
			<br />転職成功者の体験記を効率よく検索できます。
			<br />※：検索キーワードをすべてタイトルに含む記事を抽出します。
			転職成功者の体験記を効率よく検索するために、このサイトでは検索対象ドメインや検索条件※を指定し、（インタイトル）
		-->
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
			未経験からwebエンジニアを目指す人のプロフィールをチェックできます。（会員登録が必要）
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
			コメント機能により、気になるメンバーとコミュニケーションをとれます。（会員登録が必要）
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
			メンバーの紹介するおすすめの体験記をチェックできます。（会員登録が必要）
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
			あなたが参考になった体験記を他のメンバーに紹介できます。（会員登録が必要）
		</p>
	</div>
</template>

<style scoped>
.seven-function-eye-catching-img {
	display: block;
	margin: 0 auto;
	max-width: 600px;
	width: 100%;
}
.function-explanation-number {
	font-size: 28px;
	color: white;
	display: block;
	height: 33px;
	width: 33px;
	border-radius: 50%;
	line-height: 33px;
	text-align: center;
	background-color: #7db4e6;
	margin-top: 7px;
	margin-right: 7px;
}
/*
padding-top: 7px;
*/
.function-explanation-title-area {
	display: flex;
}

.supplementary-explanation-paragraph {
	margin-top: 15px;
	margin-right: 15px;
	margin-left: 15px;
}
</style>
