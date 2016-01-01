
// ARTICLE EDIT FUNCTIONS

function chk_select(format) {
    var flag = 0;
    sel = window.getSelection();
    for (var i = 0; i < sel.rangeCount; i++) {
        var s = sel.getRangeAt(i).startContainer.parentNode.parentNode.id;
        var e = sel.getRangeAt(i).endContainer.parentNode.parentNode.id;		
        if (s == "article_text_text") flag = 1;
        if (flag = 1 && e == "article_text_text" || e == "child") flag = 2;
		
		if (flag == 2) {
		  var range;
		  var text = sel.toString();
		  range = sel.getRangeAt(i);
		  range.deleteContents();
		  
		  var element = document.createElement(format);
		  element.appendChild(document.createTextNode(text));
		  range.insertNode(element);
		  
		}
		
    }
}

function ArticleSubmit(){
  
  jQuery.getJSON('../../home/main/discussions/discussion_template.json',function(data){     
     
	 data.article_type = $('#ArticleType').val();
	 
     data.article_abstract.article_title = $('#abstract_title').html().trim();
	 data.article_abstract.article_image = $('#abstract_title').html().trim()+'_icon.jpg';
	 data.article_abstract.article_abstract = $('#discuss_abstract_text').html().trim();
	 
	 data.article.article_title = $('#article_title').html().trim();
	 data.article.article=$('#article_text_text').html().trim();
	 data.article.pic = $('#abstract_title').html().trim() + '.jpg';
	 data.article.galleries = './' + $('#abstract_title').html().trim() +'/';
	 
	 data.article.article_author = $('#article_author_name').html().trim();
	 data.article.about_author = $('#article_author_text').html().trim();
	 data.article.author_pic = $('#article_author_name').html().trim() + '.jpg';
	 
	 var s = [];
	 
	 s = s + JSON.stringify({"article_type" : data.article_type}, undefined, 2)  + '\r\n\r\n';
	 s = s + '-SPLIT--TYPE--HERE-'  + '\r\n\r\n';	 
	 s = s + JSON.stringify({"abstract" : data.article_abstract}, undefined, 2)  + '\r\n\r\n';
	 s = s + '-SPLIT--ABSTRACT--HERE-'  + '\r\n\r\n';	 
     s = s + JSON.stringify({"article" : data.article}, undefined, 2) + '\r\n\r\n';	 
	 //var s = JSON.stringify(data, undefined, 2);
	
	 var blob = new Blob([s], {type: "text/plain;charset=utf-8"});
	 saveAs(blob, data.article_abstract.article_title+".json");

	 //window.open("data:text/json;charset=utf-8," + escape(s));
  });

}
function ArticleTextEdit(format){
chk_select(format);
}

function ArticleChangePicture(id){
console.log('Update picture');
 if(id==1){
   $('#AbstractPicSelect').trigger('click');
 }else{
   $('#MainPicSelect').trigger('click');
 }
 
}

/*
Backup IE
 else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
*/