<template><!-- eslint-disable --><!-- prettier-ignore -->
  <div>
    
    <!--

        <b-icon icon="x" ></b-icon>
        <b-button v-b-toggle.collapse-44 variant="primary" id="experience-open-close-button">体験記の登録
        <b-icon icon="chevron-down" ></b-icon></b-button>

    <b-collapse id="collapse-44" class="mt-2">


    -->
    <b-button v-b-toggle.collapse-experience variant="primary" id="experience-open-close-button">体験記の登録
        <b-icon icon="chevron-down" ></b-icon></b-button>

    <b-collapse id="collapse-experience" class="mt-2">
        <b-card bg-variant="light">
            <b-form-group
              label-cols-lg="3"
              label="体験記の登録"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
                <p>ここで登録された記事は、成功者グラフページに反映されます。</p>
                <b-form-group
                  label-cols-sm="3"
                  label="記事URL:"
                  label-align-sm="right"
                  
                >
                  <b-form-input  v-model="url"></b-form-input>
                </b-form-group>
                <b-form-group
                  label-cols-sm="3"
                  label="記事タイトル:"
                  label-align-sm="right"
                  
                >
                  <b-form-input v-model="title"></b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="年齢:"
                  label-align-sm="right"
                  
                >
                  <b-form-select v-model="age" :options="optionsOfAge"></b-form-select>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="学歴:"
                  label-align-sm="right"
                 
                >
                  <b-form-select v-model="educationalBackground" :options="optionsOfEducationalBackground"></b-form-select>
                </b-form-group>
                <b-form-group
                  label-cols-sm="3"
                  label="勉強期間(ヶ月):"
                  label-align-sm="right"
                  
                >
                  <b-form-input  type="number" v-model.number="studyTerm"></b-form-input>
                </b-form-group>
                <b-form-group
                  label-cols-sm="3"
                  label="スクール有無:"
                  label-align-sm="right"
                  
                >
                  <b-form-select v-model="schoolPresence" :options="optionsOfSchoolPresence"></b-form-select>
                </b-form-group>
                <b-form-group
                  label-cols-sm="3"
                  label="転職先:"
                  label-align-sm="right"
                  
                >
                  <b-form-select v-model="company" :options="optionsOfCompany"></b-form-select>
                </b-form-group>

                <!--
                    <article-url></article-url>
                    <article-title></article-title>
                    <age-section></age-section>
                    <educational-background-section></educational-background-section>
                    <study-term-section></study-term-section>
                    <school-presence-section></school-presence-section>
                    <company-section></company-section>
                -->

                
                
                
                
                
                

                <!--登録前に送信内容をチェック-->
                <!--
                <div>{{ $store.state.articleAddition.url }}</div>
                <div>{{ $store.state.articleAddition.title }}</div>
                <div>{{ $store.state.articleAddition.age }}</div>
                <div>{{ $store.state.articleAddition.educationalBackground }}</div>
                <div>{{ $store.state.articleAddition.studyTerm }}</div>
                <div>{{ $store.state.articleAddition.schoolPresence }}</div>
                <div>{{ $store.state.articleAddition.language.join(",") }}</div>
                <div>{{ $store.state.articleAddition.framework.join(",") }}</div>
                <div>{{ $store.state.articleAddition.company }}</div>
                -->
                <div>
                    <b-button v-on:click="registerArticle" id="experience-article-registration-button" variant="primary">記事を登録</b-button>
                </div>


            </b-form-group>
        </b-card>
    </b-collapse>
    
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
//import ArticleUrl from '~/components/article-url.vue'
//import ArticleTitle from '~/components/article-title.vue'
//import AgeSection from '~/components/age-section.vue'
//import EducationalBackgroundSection from '~/components/educational-background-section.vue'
//import StudyTermSection from '~/components/study-term-section.vue'
//import SchoolPresenceSection from '~/components/school-presence-section.vue'
//import LanguageSection from '~/components/language-section.vue'
//import FrameworkSection from '~/components/framework-section.vue'
//import CompanySection from '~/components/company-section.vue'

import firebase from 'firebase'
import db from '../plugins/firebase_config'
import sanitizeHTML from 'sanitize-html';
import _cloneDeep from 'lodash/cloneDeep';

import {  BIcon, BIconX, BIconQuestionCircle, BIconChevronDown  } from 'bootstrap-vue';

export default {
  name: 'ArticleRegistration',
  components: {    
    BIcon,
    BIconX,
    BIconQuestionCircle,
    BIconChevronDown,
    //'article-url': ArticleUrl,
    //'article-title': ArticleTitle,
    //'age-section': AgeSection,
    //'educational-background-section': EducationalBackgroundSection,
    //'study-term-section': StudyTermSection,
    //'school-presence-section': SchoolPresenceSection,
    //'language-section': LanguageSection,
    //'framework-section': FrameworkSection,
    //'company-section': CompanySection,   
  },
  data () {
    return {
        editFlag:false,  
        /**/
        url:"",
        title: "",
        //age: null,
        age: "",
        //educationalBackground: null,
        educationalBackground: "",
        studyTerm: "",
        //schoolPresence: null,
        schoolPresence: "",
        //company: null,
        company: "",

        optionsOfAge: [
            { value: "", text: '選択してください' },
            { value: '20代前半', text: '20代前半' },
            { value: '20代後半', text: '20代後半' },
            { value: '30代前半', text: '30代前半' },
            { value: '30代後半', text: '30代後半' },
            { value: '40代前半', text: '40代前半' },
            { value: '40代後半', text: '40代後半' },
            { value: '50代', text: '50代' },
            { value: '60代以降', text: '60代以降' },
          
        ],
        
        optionsOfEducationalBackground: [
            { value: "", text: '選択してください' },
            { value: '高卒', text: '高卒' },
            { value: '高専卒', text: '高専卒' },
            { value: '大卒', text: '大卒' },
            { value: '大学院卒', text: '大学院卒' },
                  
        ],  
        optionsOfSchoolPresence: [
            { value: "", text: '選択してください' },
            { value: 'あり', text: 'あり' },
            { value: 'なし', text: 'なし' },
            
          
        ], 
        optionsOfCompany: [
            { value: "", text: '選択してください' },
            { value: '自社開発', text: '自社開発' },
            { value: '受託', text: '受託' },
            { value: 'SIer', text: 'SIer' },
            { value: 'SES', text: 'SES' },
            { value: 'その他', text: 'その他' },
            
          
        ],

    }
  }, 
  computed:{
    /*
    getOptionsOfAage(){
        return this.$store.state.articleAddition.optionsOfAge;
    },
    */
    /*
    url:{
        get:function(){
            //return this.$store.state.articleAddition.url;
            return this.$store.getters['articleAddition/getUrl'];

        },
        set:function(urlData){
            this.$store.commit('articleAddition/changeUrl', urlData);
        },
    },
    */
    /*
    title:{
        get:function(){
            return this.$store.state.articleAddition.title;
        },
        set:function(titleData){
            this.$store.commit('articleAddition/changeTitle', titleData);
        },
    },

    age:{        
        get:function(){
            return this.$store.state.articleAddition.age;
        },        
        set:function( ageData ){
            this.$store.commit('articleAddition/changeAge', ageData);
        },        
    },
    educationalBackground:{        
        get:function(){
            return this.$store.state.articleAddition.educationalBackground;
        },        
        set:function(educationalBackgroundData){
            this.$store.commit('articleAddition/changeEducationalBackground', educationalBackgroundData);
        },        
    },
    studyTerm:{
        get:function(){
            return this.$store.state.articleAddition.studyTerm;
        },
        set:function(studyTermData){
            this.$store.commit('articleAddition/changeStudyTerm', studyTermData);
        },
    },
    schoolPresence:{        
        get:function(){
            return this.$store.state.articleAddition.schoolPresence;
        },        
        set:function(schoolPresenceData){
            this.$store.commit('articleAddition/changeSchoolPresence', schoolPresenceData);
        },        
    },
    company:{        
        get:function(){
            return this.$store.state.articleAddition.company;
        },        
        set:function(companyData){
            this.$store.commit('articleAddition/changeCompany', companyData);
        },        
    },
    */
  },   
  methods: {
    addExperience(){
        //体験記の追加ボタンが押されたときの挙動
        this.editFlag = true;

    },
    async registerArticle(){   

        const articleData = {
            url: sanitizeHTML(this.url),
            title: sanitizeHTML(this.title),
            age: this.age,
            educationalBackground: this.educationalBackground,
            studyTerm: sanitizeHTML(this.studyTerm),
            schoolPresence: this.schoolPresence,
            company: this.company,


        };


        console.log("articleData:");
        console.log(articleData);
        //firebaseに体験記データを追加
        const result = await this.$store.dispatch('registerArticleAction',_cloneDeep(articleData) );
        //入力欄の初期化

        if(result=== "success"){
            this.url="";
            this.title="";
            this.age=null;
            this.educationalBackground=null;
            this.studyTerm="";
            this.schoolPresence=null;
            this.company=null;

            alert("記事の登録完了");

            //success-graph.vueが表示されたとき、新たにDBと通信して最新の体験記データを取得する
            this.$store.dispatch('changeIsExperienceArticlesAction',false);


        } else {

            alert(`記事登録時にエラーが発生しました。${result}`);
        }
        



    },
    /*
    registerArticle(){   

        //firebaseに体験記データを追加
        //this.$store.dispatch('articleAddition/registerArticleAction');

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
    */   
  },
}
</script>


<style scoped>
/* prettier-ignore */

#experience-open-close-button{

    width:400px;

}


#experience-article-registration-button{


    display:block;
    margin-left:auto;
}


</style>