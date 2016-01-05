function chkMobile(){

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
return isMobile;	
}


if (!String.prototype.format) {
// This is the function.
		String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
		String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
}



function SwitchGallery(dir){
    dir = SIMASlider.current_gallery + dir == galleries.length ? 0 : dir;
	dir = SIMASlider.current_gallery + dir == -1 ? 0 : dir;
	
	if(dir !=0){
		SIMASlider.current_gallery = SIMASlider.current_gallery + dir ; 	
		SIMASlider.images = galleries[SIMASlider.current_gallery].images;	
		SIMASlider.current_image = 0;
		SIMASlider.img.css('background-image', "url(" + '../../static/pics/galleries/' + article.galleries + galleries[SIMASlider.current_gallery].dir + SIMASlider.images[SIMASlider.current_image]+ ")");
	}
	return dir;
}

function GalleryHitCheck(x,y){
	 
	  
	  if(x>600){
		if(y>2*112){
			return -1;
		}
		if(y<112){
			return 1;
		}
	  }
	 return 0;
}
function SIMASliderInit(){
	SIMASlider.temp=0;
	
	SIMASlider.el_sel  = [];
	SIMASlider.car_sel = [];
	
	SIMASlider.img = $('div[id^="SG{0}"]'.format([(0).toString()]));
	SIMASlider.current_gallery = galleries.length - 2 ; 
	SwitchGallery(1);
	
	
	var p;
	
	//SelectorPosition Initizialize
	for(var i=0;i<5;i++){
		SIMASlider.el_sel[i] = $('div[id^="SG{0}"]'.format([(i+6).toString()]));
		SIMASlider.car_sel[i]=i;
	}
	SIMASlider.indent_sel = SIMASlider.el_sel[0].outerHeight();
	p = -SIMASlider.indent_sel;
	for(var i=0;i<5;i++){
		SIMASlider.el_sel[i].css({'top' : p , left : 0});
		p  = p + SIMASlider.indent_sel;
		SIMASlider.el_sel[i].css('z-index',110+i);	
		//Clear
		SIMASlider.el_sel[i].empty();
	}
	
	p = 0 ;
	p = p - $('#SIMAGalleryFrame').outerHeight()-4;
	$('#SIMAGalleryFrame').css('z-index',116);
	$('#SIMAGalleryFrame').css({'top' : p , left : 0});
			
	//Fill up till ava
	var z = galleries.length > 3 ? 3 : galleries.length ;
	for(var i = 0 , j = galleries.length - 1 ; i < z ; i++,j--){
		SIMASlider.el_sel[2-i].append(galleries[j].tag);
	}
	
	$("#SIMAGallery").mousemove(function(e){  
		var rect = this.getBoundingClientRect();	  
	    var x = parseInt(e.clientX)-rect.left;
	    var y = rect.top-parseInt(e.clientY)+336;	
		
		b = GalleryHitCheck(x,y);
		if(b==-1){
			SIMASlider.el_sel[SIMASlider.car_sel[1]].css('color','rgb(190,190,190)');
		}
		if(b==1){
			SIMASlider.el_sel[SIMASlider.car_sel[3]].css('color','rgb(190,190,190)');
		}
		if(b==0){
			SIMASlider.el_sel[SIMASlider.car_sel[1]].css('color','rgb(255,255,255)');
			SIMASlider.el_sel[SIMASlider.car_sel[3]].css('color','rgb(255,255,255)');
		}
		console.log();	  
    });
	$("#SIMAGallery").mouseleave(function(e){  
		var rect = this.getBoundingClientRect();	  
	    var x = parseInt(e.clientX)-rect.left;
	    var y = rect.top-parseInt(e.clientY)+336;
		for(var i = 0 ; i < 5 ; i++){
			SIMASlider.el_sel[SIMASlider.car_sel[i]].css('color','rgb(255,255,255)');
		}
    });
	$( '#SIMAGallery').click(function(e) {
		var rect = this.getBoundingClientRect();	  
	    var x = parseInt(e.clientX)-rect.left;
	    var y = rect.top-parseInt(e.clientY)+336;
		b = GalleryHitCheck(x,y);
		SIMASliderSelectRoll(SwitchGallery(b));
		for(var i = 0 ; i < 5 ; i++){
			SIMASlider.el_sel[SIMASlider.car_sel[i]].css('color','rgb(255,255,255)');
		}
		return false;
	});
}


function SIMASliderRun(dir){

		SIMASlider.current_image = SIMASlider.current_image + dir;
		SIMASlider.current_image = SIMASlider.current_image == SIMASlider.images.length ? 0 : SIMASlider.current_image;
		SIMASlider.current_image = SIMASlider.current_image == -1 ? SIMASlider.images.length-1 : SIMASlider.current_image;		

		
		SIMASlider.img.fadeTo('slow', 0.3, function()
		{
			$(this).css('background-image', "url(" + '../../static/pics/galleries/' + article.galleries + galleries[SIMASlider.current_gallery].dir + SIMASlider.images[SIMASlider.current_image] + ")");
		}).fadeTo('slow', 1);
		
}

function SIMASliderSelectRoll(dir){
	
	if(dir !=0){
		var dp = dir == -1 ? -SIMASlider.indent_sel : SIMASlider.indent_sel;	
		if(dir == 1){		
			SIMASlider.el_sel[SIMASlider.car_sel[0]].css({'top' : 3*SIMASlider.indent_sel});		
			var p = -SIMASlider.indent_sel ;
			for(var i = 1 ; i < 5 ; i++){			
				SIMASlider.el_sel[SIMASlider.car_sel[i]].animate({'top' : p},500);
				p = p + SIMASlider.indent_sel ;
			}		
			SIMASlider.car_sel = SIMASlider.car_sel.slice(1,5).concat([SIMASlider.car_sel[0]]);	

			
		}else{
			SIMASlider.el_sel[SIMASlider.car_sel[4]].css({'top' : -SIMASlider.indent_sel});
			var p = 0 ;
			for(var i = 0 ; i < 4 ; i++){			
				SIMASlider.el_sel[SIMASlider.car_sel[i]].animate({'top' : p},500);
				p = p + SIMASlider.indent_sel ;
			}
			SIMASlider.car_sel = ([SIMASlider.car_sel[4]]).concat(SIMASlider.car_sel.slice(0,4));	
		}	

		for(var i=0;i<5;i++){
				SIMASlider.el_sel[SIMASlider.car_sel[i]].css('z-index',110+i);
		}	
	}
	
	
}


//slide function
function slide(where){	
	SIMASliderRun(1);
/*	
	SIMASlider.temp++;
	if(SIMASlider.temp==5){
		SIMASlider.temp=0;
		SIMASliderSelectRoll(SwitchGallery(-1));
	}
*/
    
}

function TabClicked(id){
	var p = ($('#article_abs_1').outerHeight())*articles[id].start + 20;
	$('#variable_height').stop().animate({scrollTop:p}, '500', 'swing', function() { 							
	});
}

var article_type = 'articles';

function ArticleClicked(id){
	console.log(id);
	window.sessionStorage.setItem("ArticleToLoad","articles/SCL");
	for(var i= 0 , k = 0; i < articles.length ; i++){
		for(var j = 0 ; j < articles[i].article_list.length;j++){
			if(k == id){				
				window.sessionStorage.setItem("ArticleToLoad",article_type + '/'+articles[i].article_list[j].article_title);
			}
			k++;
		}
	}
	
	if(article_type=='articles'){
	 window.location.href = "./main_article.html";
	}else{
	 window.location.href = "./main_discussions.html";
	}
}



function LoadArticleList(type){
	article_type=type;
	jQuery.getJSON('../../home/main/'+ article_type +'/article_list.json',function(data){
		
		articles = data.articles;
		//Create Section Tabs	
		var t = $('#section_tabs');
		t.empty();
		for ( var i = articles.length-1 ; i >=0  ; i--){
			t.append('<div id="section_tab" onclick="TabClicked({1})"> {0} </div>'.format([articles[i].article_type,i.toString()]));
		}
		
		var a1 = $('.article_abstract_1').clone();
		var a2 = $('.article_abstract_2').clone();
		//Create Sections		
		t = $('#variable_height');
		
		t.empty();
		t.append('<div id="spacer" style="height:20px"></div>');
		
		var k = 0;
		for ( var i = 0 ; i < articles.length ; i++){
		
			var article_list = articles[i].article_list;
			articles[i].start = k;
			for ( var j=0;j < article_list.length;j++){
			
				var el ;
				if( k%2==0){
					el =  a1.clone();
				}else{
					el =  a2.clone();
				}
				
				el.find('.article_abstract_title').empty().append(article_list[j].article_title);
				el.find('#article_abstract_image').css('background-image', 'url(../../home/main/'+ article_type + '/{0})'.format([article_list[j].article_image]));
				el.find('#article_abstract_text').empty().append(article_list[j].article_abstract);
				el.attr("id","article_abs_"+k.toString());
				el.attr("onclick","ArticleClicked({0})".format([k.toString()]));
				el.appendTo(t);
				
				k = k + 1;
			}
		}
		
		t.append('<div id="spacer" style="height:220px"></div>');
		$('#variable_height').css('width',$( document ).width()-10) ;
		$('#variable_height').css('height',$( document ).height()-200) ;
	});	
	
	if(chkMobile()==true) alert('Mobile');
}
function LoadDiscussionsList(type){
	article_type=type;
	jQuery.getJSON('../../home/main/'+ article_type +'/article_list.json',function(data){
		
		articles = data.articles;
		//Create Section Tabs	
		var t = $('#section_tabs');
		t.empty();
		for ( var i = articles.length-1 ; i >=0  ; i--){
			t.append('<div id="section_tab" onclick="TabClicked({1})"> {0} </div>'.format([articles[i].article_type,i.toString()]));
		}
		
		var a1 = $('.article_abstract_1').clone();
		var a2 = $('.article_abstract_2').clone();
		//Create Sections		
		t = $('#variable_height');
		
		t.empty();
		t.append('<div id="spacer" style="height:20px"></div>');
		
		var k = 0;
		for ( var i = 0 ; i < articles.length ; i++){
		
			var article_list = articles[i].article_list;
			articles[i].start = k;
			for ( var j=0;j < article_list.length;j++){
			
				var el ;
				if( k%2==0){
					el =  a1.clone();
				}else{
					el =  a2.clone();
				}
				
				el.find('.discuss_abstract_title').empty().append(article_list[j].article_title);
				el.find('#article_abstract_image').css('background-image', 'url(../../home/main/'+ article_type + '/{0})'.format([article_list[j].article_image]));
				el.find('#discuss_abstract_text').empty().append(article_list[j].article_abstract);
				el.attr("id","article_abs_"+k.toString());
				el.attr("onclick","ArticleClicked({0})".format([k.toString()]));
				el.appendTo(t);
				
				k = k + 1;
			}
		}
		
		t.append('<div id="spacer" style="height:220px"></div>');
		$('#variable_height').css('width',$( document ).width()-10) ;
		$('#variable_height').css('height',$( document ).height()-200) ;
	});	
	
	if(chkMobile()==true) alert('Mobile');
}

function LoadArticle(name){
	//Load Article
	console.log(name)
	var patt = new RegExp('articles', "i");
	jQuery.getJSON('../../home/main/' + name +'.json',function(data){
	
		article = data.article;				
			
		$('#article_title').empty().append(article.article_title);
		$('#article_text_text').empty().append(article.article);
		
		$('#article_author_text').empty().append(article.about_author);	
        
		var url='url(../../home/main/authors/'+ article.author_pic + ')';
		url = encodeURIComponent(url.trim()) 
		console.log(url)
		$('#author_image').css('background-image', url);					
		console.log($('#author_image').css('background-image'))
		$('#fbcommentplugin').empty().append('<div class="fb-comments" data-href="http://simaiisc.org/home/main/main_article_{0}.html" data-width="650" data-numposts="5"></div>'.format([article.article_title]));
	
		if(patt.test(name)){
			console.log('Fetching galleries');
			jQuery.getJSON('../../static/pics/galleries/'+ article.galleries + '/gallery.json',function(data){
				galleries = data.galleries;
				console.log(galleries)
				SIMASliderInit();
			});
		}else{		
		     $('#SIMAGallery').css('background-image','url(../../home/main/discussions/' + article.pic + ')')
		}
		
		$('#variable_height').css('width',$( document ).width()-10) ;
		$('#variable_height').css('height',$( document ).height()-260) ;
	});
}

function LoadGallery(name){
	//Load Article
	console.log(name)
	 article.galleries = './' + name +'/';

		console.log('Fetching galleries');
		jQuery.getJSON('../../static/pics/galleries/'+ name + '/gallery.json',function(data){
			galleries = data.galleries;
			console.log(galleries)
			SIMASliderInit();
		});
		//$('#variable_height').css('width',$( document ).width()-10) ;
		$('#variable_height').css('height',$( document ).height()-260) ;
	
}

function MainGallerySetup(){
	jQuery.getJSON('../../home/main/gallery/galleries.json',function(data){
		MainGallery.galleries = data.galleries;
		MainGallery.el = [];
		MainGallery.slided = [];
		var n = MainGallery.galleries.length;
		for(var i = 0 ; i < n ; i++){
		   MainGallery.el[i] =  $('#SMG_I{0}'.format([(i+1).toString()]));		  
		   MainGallery.el[i].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[i].pic + ")");
		   MainGallery.el[i].append(i.toString());
		   MainGallery.slided[i] = 0;
		}
		
		MainGallery.slide_length = 40;
		
		MainGallery.windows = [];
		MainGallery.windows[0] = [1,2,3,4,5];
		MainGallery.windows[1] = [8,9,10];
		MainGallery.windows[2] = [6,7,8,9,10];
		MainGallery.windows[3] = [0,1,2,3];
		MainGallery.flipped = false;
		
		MainGallery.wid = -1;
		MainGallery.iid = 0;
	});
   
}

function flip(){
  
  if(MainGallery.flipped==false){
	
	var wid = (MainGallery.wid + 1)==MainGallery.windows.length ? 0 : MainGallery.wid + 1
    var iid = Math.floor((Math.random() * MainGallery.windows[wid].length));
    MainGallery.wid = wid;
	MainGallery.iid = iid;
	
	//For scaling, find the leftmost el
	var l = 0 ;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  if(MainGallery.el[MainGallery.windows[wid][i]].position().left > MainGallery.el[MainGallery.windows[wid][l]].position().left){
	    l = i;
	  }	
	}
	var wt = MainGallery.el[MainGallery.windows[wid][l]].position().left - MainGallery.el[MainGallery.windows[wid][0]].position().left;
	wt = wt + MainGallery.el[MainGallery.windows[wid][l]].width(); 
    
	MainGallery.flipped = true;
	var w=0,h=0;
	var ox = MainGallery.el[MainGallery.windows[wid][0]].position().left;
	var oy = MainGallery.el[MainGallery.windows[wid][0]].position().top;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  var x = MainGallery.el[MainGallery.windows[wid][i]].position().left - ox;
	  var y = MainGallery.el[MainGallery.windows[wid][i]].position().top  - oy;
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[MainGallery.windows[wid][iid]].pic + ")");
	  
	  var idx = MainGallery.windows[wid][i];	  		  
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-size','{0}px auto'.format([wt.toString()]));
	  MainGallery.slided[idx] = -x;
	  MainGallery.el[idx].css('background-position','{0}px {1}px'.format([-x.toString(),-y.toString()]));
	  
	  
	}
  }else{
    var wid,iid;
	wid = MainGallery.wid;
	iid = MainGallery.iid;
	MainGallery.flipped = false;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[MainGallery.windows[wid][i]].pic + ")");
	  //MainGallery.el[MainGallery.windows[wid][i]].css('background-size','auto auto');
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-size','cover');
	  var x = 0;
	  
	  MainGallery.slided[MainGallery.windows[wid][i]] = x;
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-position','{0}px 0px'.format([x.toString()]));
	}
  }
}

function MainGallery_hoverslide(el,l){

			if(l==1){ //hover out
			   for(var i = 0 ; i < MainGallery.el.length ; i++){
			      var x = MainGallery.slided[i];
				  MainGallery.el[i].stop().animate({'background-position-x': (x).toString() + 'px'}, 500 );
			   }
			   return;
			}
			
            var slided = false;
			var id = el.attr("id");
			  var idx = 0 ;
			  for(var i = 0 ; i < MainGallery.el.length ; i++){
				if(MainGallery.el[i].attr("id")==id){
				  idx = i ; break;
				}
			 }
			var wid = MainGallery.wid;
			if(MainGallery.flipped==true){			  
			  //See if among flipped windows			  
			  for(var i=0;i<MainGallery.windows[wid].length;i++){
			     if(idx==MainGallery.windows[wid][i]){
					slided = true;
				 }
			  }
			}
			  //Slide all in flipped state 
			  if((slided==true)){
				  for(var i=0;i<MainGallery.windows[wid].length;i++){
				    var x = MainGallery.slided[MainGallery.windows[wid][i]];
					x = x - MainGallery.slide_length;
					MainGallery.el[MainGallery.windows[wid][i]].stop().animate({'background-position-x': x.toString()+'px'}, 500 );					
				  }
			  }
			
			
			if((slided==false)){
			   var x = MainGallery.slided[idx];
			   x = x - MainGallery.slide_length;
			   MainGallery.el[idx].stop().animate({'background-position-x': (x).toString() + 'px'}, 500 );
			}
			
}


function SetMemberList(members){
        var t = $('#memt').empty();
		
		t.append(MemberData.xh);
		for(var i=0;i<members.length;i++){
		   var r ;
		   if(i%2==0){
			r = MemberData.x1.clone();
		   }else{
			r= MemberData.x2.clone();
		   }
		   r.find('.tIndex').empty().append((i+1).toString());
		   r.find('.tName').empty().append(members[i][0]);
		   r.find('.tCourse').empty().append(members[i][1]);
		   r.find('.tPlace').empty().append(members[i][2]);
		   t.append(r);
		}
}


function MemberSearch(field){
    var company = $('#Company').text();
	$('#Company').empty().append('Searching...');
	var list = [];
	MemberData.FileCount = MemberData.list.length;
	
	var patt = new RegExp(company, "i");
	
	for(var i = 0 ; i < MemberData.list.length ; i++){
	    var m;		
		jQuery.getJSON('../../home/main/members/' + MemberData.list[i] + '.json',function(data){
			     for(var j = 0;j<data.members.length;j++){
					if(patt.test(data.members[j][field])){
						list.push(data.members[j]);
					}
				 }				 
			   MemberData.FileCount=MemberData.FileCount-1;
				if(MemberData.FileCount==0){		
			     console.log("Search Complete...");
				 SetMemberList(list);
				 $('#Company').empty().append(company);
			   }
		});

	}
	
}

function UpdateMemberData(year){
	  jQuery.getJSON('../../home/main/members/' + year + '.json',function(data){
		console.log(data);
		MemberData.members = data.members;
		MemberData.x1 = $('#mem1').clone();
		MemberData.x2 = $('#mem2').clone();
		MemberData.xh = $('#memh').clone();
		SetMemberList(MemberData.members);
		
	 });
 
}
function LoadMembers(year){

 jQuery.getJSON('../../home/main/members/list.json',function(data){
	
	console.log(data.list)
	MemberData.list=data.list;
	var t = $('#section_tabs').empty();
	for(var i=MemberData.list.length-1;i>=0;i--){
		t.append('<div id="section_tab" onclick="UpdateMemberData('+ MemberData.list[i] + ')">' + MemberData.list[i] +'</div>');
	}
	
    UpdateMemberData(MemberData.list[0]);
 });  
}
