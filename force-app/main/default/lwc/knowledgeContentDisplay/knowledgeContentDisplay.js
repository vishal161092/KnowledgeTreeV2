import { LightningElement, api, wire } from "lwc";
import getKnowledgeArticle from "@salesforce/apex/DE_KnowledgeVisualizationHelper.getKnowledgeArticle";
//import voteArticle from "@salesforce/apex/DE_KnowledgeVisualizationHelper.voteArticle";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
// import getFeedback from "@salesforce/apex/DE_KnowledgeVisualizationHelper.getFeedback";
import { NavigationMixin } from 'lightning/navigation';

export default class KnowledgeContentDisplay extends LightningElement {
  selectedKnowledgeArticleId;
  selectedCategory;
  updateArtType;
  articleDetail;
  articleTitle;
  articleNumber;
  recordType;
  language;
  versionNumber;
  articleList;
  likes = 0;
  dislikes = 0;
  noArt = false;

  showArti = false;
  artType;
  lang;
  sortBy;

  value1 = '--None--';
  value2 = '--None--';;
  value3 = '--None--';;
  get options1() {
    return [
        { label: 'One Pager', value: 'One Pager' },
        { label: 'Video', value: 'Video' },
        { label: 'Presentation', value: 'Presentation' },
        { label: 'Cirrus', value: 'Cirrus' },
        { label: 'FAQ', value: 'FAQ' },
        { label: 'KCSArticle', value: 'KCSArticle' },
    ];
}
  get options3() {
  return [
      { label: 'Newest', value: 'Newest' },
      { label: 'Oldest', value: 'Oldest' },
  ];
}
  get options2() {
  return [
      { label: 'All', value: 'All' },
      { label: 'English', value: 'English' },
      { label: 'Spanish', value: 'Spanish' },
      { label: 'French', value: 'French' },
  ];
}

  @api
  get selCat() {
    return this.selectedCategory;
  }

  /* @api
  get seltype() {
    return this.updateArtType;
  } */

  set selCat(value) {
    console.log('@1111@'+value);

    this.template.querySelectorAll('lightning-combobox').forEach(each => {
      each.value = null;
  });

    this.value1 = null;
    this.value2 = null;
    this.value3 = null;
   // this.selectedKnowledgeArticleId = value;
    this.selectedCategory = value;
    this.showArti = false;
  }

  /* set seltype(value) {
    console.log('!!!'+value);
   // this.selectedKnowledgeArticleId = value;
    this.updateArtType = value;
  } */

   /* @wire(getKnowledgeArticle, {
    selectedCategory: "$selectedCategory"
  }) 
  getKnowledgeArticleDetails({ error, data }) {
    if (error) console.log(data);
    else if (data) {
      console.log('>>'+JSON.stringify(data));
      this.articleList = data;
    //  this.articleDetail = data.Answer__c;
    //  this.articleTitle = data.Title;
    //  this.articleNumber = data.ArticleNumber;
    //  this.recordType = data.RecordType.Name;
    //  this.language = data.Language;
    //  this.versionNumber = data.VersionNumber;
    }
  } */

  tileClick(event){
    console.log('>>'+event.currentTarget.dataset.id);

    window.open('https://pacifica192demo-159fc44679a--17f285aa067.force.com/px/s/article/'+event.currentTarget.dataset.id);

  }

handleChange1(event) {
    this.artType = event.detail.value;
    console.log('>>'+this.artType);
    console.log('##>'+this.selectedCategory);

    getKnowledgeArticle({ 
      selectedCategory: this.selectedCategory, 
      RecType: this.artType
    })
		.then(result => {
      console.log('@@>'+result);

      if(result == null)
      {
        this.noArt = true;
      }
      else
      {
        this.articleList = result;
        this.noArt = false;
      }
			
			//this.error = undefined;
		})
		.catch(error => {
			console.log('>>>'+error);
			//this.accounts = undefined;
		})

}
handleChange2(event) {
  this.lang = event.detail.value;
  console.log('>>'+this.lang);
}
handleChange3(event) {
  this.sortBy = event.detail.value;
  console.log('>>'+this.sortBy);
  this.showArti = true;
}

/*   @wire(getFeedback, { knowledgeArticleId: "$selectedKnowledgeArticleId" })
  getKnowledgeFeedback({ error, data }) {
    if (error) console.log(error);
    else if (data) {
      JSON.parse(JSON.stringify(data)).map((item) => {
        if (item.artfeed__Like__c) this.likes = this.likes + 1;
        else this.dislikes = this.dislikes + 1;
      });
    }
  } */

/*   handleVote(event) {
    let type = event.target.dataset.type;
    let boolType;

    if (type === "up") {
      boolType = true;
      this.likes = this.likes + 1;
    } else {
      boolType = false;
      this.dislikes = this.dislikes + 1;
    }
    voteArticle({
      knowledgeArticleId: this.selectedKnowledgeArticleId,
      vote: boolType
    }).then((response) => {
      const evt = new ShowToastEvent({
        title: "Success",
        message: "Feedback submited!!",
        variant: "success"
      });
      this.dispatchEvent(evt);
    });
  } */
}
