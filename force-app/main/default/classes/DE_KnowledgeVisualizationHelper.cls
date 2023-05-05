public class DE_KnowledgeVisualizationHelper {
  @AuraEnabled(cacheable=true)
  public static List<Knowledge__DataCategorySelection> getKnowledgeCategories() {
    return [
      SELECT DataCategoryName, DataCategoryGroupName, ParentId, Parent.Title
      FROM Knowledge__DataCategorySelection
      WHERE
        ParentId IN (SELECT Id FROM Knowledge__kav WHERE IsLatestVersion = TRUE)
    ];
  }

  @AuraEnabled(cacheable=true)
//  public static Knowledge__kav getKnowledgeArticle(String knowledgeArticleId) {
    public static List<Knowledge__kav> getKnowledgeArticle(String selectedCategory, String RecType) {
      system.debug('!!!'+selectedCategory);
      system.debug('!!!'+RecType);

      List<Id> DataCatKB = new List<Id>();

    for(Knowledge__DataCategorySelection sel: [SELECT ParentId, DataCategoryName, DataCategoryGroupName FROM Knowledge__DataCategorySelection]) {

      system.debug('>>>'+sel);
      if(sel.DataCategoryName == selectedCategory || sel.DataCategoryGroupName == selectedCategory){
        system.debug('>In>');
        DataCatKB.add(sel.ParentId);
      }

    }
    system.debug('@@@'+DataCatKB);
    system.debug('@@@'+RecType);

    List<Knowledge__kav> faqs = [SELECT Id, Title, RecordType.Name, LastPublishedDate, Image__c FROM Knowledge__kav WHERE ID IN: DataCatKB AND RecordType.Name =: RecType AND PublishStatus = 'Online'];
    system.debug('$$$$'+faqs);
        
    /* Knowledge__kav kA = [
      SELECT Title
      FROM Knowledge__kav
      WHERE Id = :knowledgeArticleId
      UPDATE VIEWSTAT
    ];
   
    return [
      SELECT
        Title, Answer__c,
        Id,
        VersionNumber,
        Language,
        RecordType.Name,
        ArticleNumber
      FROM Knowledge__kav
      WHERE Id = :knowledgeArticleId
    ]; */
    return faqs;
  }

  @AuraEnabled
  public static Integer voteArticle(String knowledgeArticleId, Boolean vote) {
    Knowledge__kav k = [
      SELECT Title, Id, VersionNumber, Language, RecordType.Name, ArticleNumber
      FROM Knowledge__kav
      WHERE Id = :knowledgeArticleId
    ];
    /*artfeed__Article_Feedback__c articleFeedback = new artfeed__Article_Feedback__c();
    articleFeedback.artfeed__Article_ID__c = knowledgeArticleId;
    System.debug(vote);
    articleFeedback.artfeed__Like__c = vote;
    articleFeedback.artfeed__Feedback_Source__c = 'Communities';
    articleFeedback.artfeed__Article_Type__c = 'Knowledge__kav';
    articleFeedback.artfeed__Article_Title__c = k.Title;
    articleFeedback.artfeed__Article_Number__c = k.ArticleNumber;
    insert articleFeedback;*/
    return null;
  }

/*   @AuraEnabled(cacheable=true)
  public static List<artfeed__Article_Feedback__c> getFeedback(
    String knowledgeArticleId
  ) {
    return [
      SELECT artfeed__Like__c
      FROM artfeed__Article_Feedback__c
      WHERE artfeed__Article_ID__c = :knowledgeArticleId
    ];
  } */
}
