<template>
  <div>
    <h2>体験記を追加する</h2>    
    <article-url></article-url>
    <article-title></article-title>
    <age-section></age-section>
    <educational-background-section></educational-background-section>
    <study-term-section></study-term-section>
    <school-presence-section></school-presence-section>
    <language-section></language-section>
    <framework-section></framework-section>
    <company-section></company-section>

  
    <!--<div>{{ $store.state.articleAddition.company }}</div>-->
    <div>{{ $store.state.articleAddition.url }}</div>
    <div>{{ $store.state.articleAddition.title }}</div>
    <div>{{ $store.state.articleAddition.age }}</div>
    <div>{{ $store.state.articleAddition.educationalBackground }}</div>
    <div>{{ $store.state.articleAddition.studyTerm }}</div>
    <div>{{ $store.state.articleAddition.schoolPresence }}</div>
    <div>{{ $store.state.articleAddition.language.join(",") }}</div>
    <div>{{ $store.state.articleAddition.framework.join(",") }}</div>
    <div>{{ $store.state.articleAddition.company }}</div>

    <button v-on:click="registerArticle">記事を登録する</button>
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

    /*    
    
    
    'company': Company,
    */
  },
  data () {
    return {     
      //url: '',
      //checkData:{},
    }
  }, 
  methods: {
    registerArticle(){
        /*
        this.checkData ={
            url: this.$store.state.articleAddition.url,              
            title: this.$store.state.articleAddition.title,
            age: this.$store.state.articleAddition.age,
            educational_background: this.$store.state.articleAddition.educationalBackground,
            study_term: this.$store.state.articleAddition.studyTerm,
            school_presence: this.$store.state.articleAddition.schoolPresence,
            language: this.$store.state.articleAddition.language.join(","),
            framework: this.$store.state.articleAddition.framework.join(","),
            company: this.$store.state.articleAddition.company,

        };
        */

        /**/
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
            this.$store.commit('articleAddition/initState');
            
        })          
        .catch(function(error) {
            alert(error.message)
        });
        


    },
    /*
    urlChange(inputUrl){
        this.url = inputUrl;

    },
    */

  },



}
</script>