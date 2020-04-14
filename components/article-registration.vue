<template>
  <div>
    <b-button v-b-toggle.collapse-44 variant="primary">体験記の登録</b-button>
    <b-collapse id="collapse-44" class="mt-2">
        <b-card bg-variant="light">
            <b-form-group
              label-cols-lg="3"
              label="体験記の登録"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
                <p>ここで登録された記事は、成功者グラフページに反映されます。</p>
                <article-url></article-url>
                <article-title></article-title>
                <age-section></age-section>
                <educational-background-section></educational-background-section>
                <study-term-section></study-term-section>
                <school-presence-section></school-presence-section>
                <company-section></company-section>

                <!--登録前に送信内容をチェック-->
                <div>{{ $store.state.articleAddition.url }}</div>
                <div>{{ $store.state.articleAddition.title }}</div>
                <div>{{ $store.state.articleAddition.age }}</div>
                <div>{{ $store.state.articleAddition.educationalBackground }}</div>
                <div>{{ $store.state.articleAddition.studyTerm }}</div>
                <div>{{ $store.state.articleAddition.schoolPresence }}</div>
                <div>{{ $store.state.articleAddition.language.join(",") }}</div>
                <div>{{ $store.state.articleAddition.framework.join(",") }}</div>
                <div>{{ $store.state.articleAddition.company }}</div>

                <b-button v-on:click="registerArticle">記事を登録する</b-button>


            </b-form-group>
        </b-card>
    </b-collapse>
    
  </div>
</template>

<script>
/* eslint-disable */
import ArticleUrl from '~/components/article-url.vue'
import ArticleTitle from '~/components/article-title.vue'
import AgeSection from '~/components/age-section.vue'
import EducationalBackgroundSection from '~/components/educational-background-section.vue'
import StudyTermSection from '~/components/study-term-section.vue'
import SchoolPresenceSection from '~/components/school-presence-section.vue'
import LanguageSection from '~/components/language-section.vue'
import FrameworkSection from '~/components/framework-section.vue'
import CompanySection from '~/components/company-section.vue'

import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {
  name: 'ArticleRegistration',
  components: {    
    'article-url': ArticleUrl,
    'article-title': ArticleTitle,
    'age-section': AgeSection,
    'educational-background-section': EducationalBackgroundSection,
    'study-term-section': StudyTermSection,
    'school-presence-section': SchoolPresenceSection,
    'language-section': LanguageSection,
    'framework-section': FrameworkSection,
    'company-section': CompanySection,   
  },
  data () {
    return {
        editFlag:false,     

    }
  }, 
  methods: {
    addExperience(){
        //体験記の追加ボタンが押されたときの挙動
        this.editFlag = true;

    },
    registerArticle(){        
        //firebaseに体験記データを追加
        db.collection("experience_articles").add({
            url: this.$store.state.articleAddition.url,              
            title: this.$store.state.articleAddition.title,
            age: this.$store.state.articleAddition.age,
            educational_background: this.$store.state.articleAddition.educationalBackground,
            study_term: this.$store.state.articleAddition.studyTerm,
            school_presence: this.$store.state.articleAddition.schoolPresence,
            language: this.$store.state.articleAddition.language.join(","),
            framework: this.$store.state.articleAddition.framework.join(","),
            company: this.$store.state.articleAddition.company,
        })
        .then(() => {
            alert("記事の登録完了");
            //入力欄の初期化
            this.$store.commit('articleAddition/initState');            
        })          
        .catch(function(error) {
            alert(error.message)
        });       
    },    
  },
}
</script>