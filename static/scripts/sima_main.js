

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
	var p = 220*articles[id].start + 10;
	$('#variable_height').stop().animate({scrollTop:p}, '500', 'swing', function() { 							
	});
			
}
function ArticleClicked(id){
	console.log(articles[id]);
	
	for(var i= 0 , k = 0; i < articles.length ; i++){
		for(var j = 0 ; j < articles[i].article_list.length;j++){
			if(k == id){				
				window.sessionStorage.setItem("ArticleToLoad",articles[i].article_list[j].article_title);
			}
			k++;
		}
	}
	window.location.href = "./main_article.html";
}
function LoadArticleList(){
	
	jQuery.getJSON('../../home/main/articles/article_list.json',function(data){
		
		articles = data.articles;
		//Create Section Tabs	
		var t = $('#section_tabs');
		t.empty();
		for ( var i = articles.length-1 ; i >=0  ; i--){
			t.append('<div id="section_tab" onclick="TabClicked({1})"> {0} </div>'.format([articles[i].article_type,i.toString()]));
		}
		
		
		//Create Sections		
		t = $('#variable_height');
		
		t.empty();
		t.append('<div id="spacer" style="height:20px"></div>');
		
		var k = 0;
		for ( var i = 0 ; i < articles.length ; i++){
			//t.append('<div class="article_section_title">{0}</div>'.format([data.articles[i].article_type]));
			var article_list = articles[i].article_list;
			articles[i].start = k;
			for ( var j=0;j < article_list.length;j++){
				//t.append('<div class="article_abstract_title"> {0} </div>'.format([article_list[j].article_title]))
				
				var s = '';	
				
				if( k%2==0){
					s = s + '<div id="article_abs_{0}" class="article_abstract_1" onclick="ArticleClicked({0})">'.format([k.toString()]) ;
					s = s + '	<div style="float:left ;">' ;
					s = s + '		<div id="article_abstract_image" style="background: url(../../static/pics/main/events/{0}) no-repeat;background-size:cover;">'.format([article_list[j].article_image]) ;
					s = s + '		</div>' ;
					s = s + '	</div>' ;
					s = s + '	<div style="float:left ; width:460px ; padding-left:10px">' ;
					s = s + '		<div >' ;					
					s = s + '			<div class="article_abstract_title">' ;
					s = s + '				{0}'.format([article_list[j].article_title]) ;
					s = s + '			</div>' ;
					s = s + '		</div>' ;					
					s = s + '		<div id="spacer" style="height:10px"></div>' ;
					s = s + '		<div>' ;					
					s = s + '			<div id="article_abstract_text">' ;
					s = s + '				{0}'.format([article_list[j].article_abstract]) ;
					s = s + '			</div>' ;
					s = s + '		</div>' ;				
					s = s + '	</div>	' ;
					s = s + '</div>' ;
			    }else{
					s = s + '<div id="article_abs_{0}" class="article_abstract_2" onclick="ArticleClicked({0})">'.format([k.toString()]) ;

					s = s + '	<div style="float:left ; width:460px ; padding-left:10px">' ;
					s = s + '		<div >' ;					
					s = s + '			<div class="article_abstract_title" style="text-align:right">' ;
					s = s + '				{0}'.format([article_list[j].article_title]) ;
					s = s + '			</div>' ;
					s = s + '		</div>' ;					
					s = s + '		<div id="spacer" style="height:10px"></div>' ;
					s = s + '		<div>' ;					
					s = s + '			<div id="article_abstract_text" >' ;
					s = s + '				{0}'.format([article_list[j].article_abstract]) ;
					s = s + '			</div>' ;
					s = s + '		</div>' ;				
					s = s + '	</div>	' ;

					s = s + '	<div style="float:left ;">' ;
					s = s + '		<div id="article_abstract_image" style="background: url(../../static/pics/main/events/{0}) no-repeat;background-size:cover;">'.format([article_list[j].article_image]) ;
					s = s + '		</div>' ;
					s = s + '	</div>' ;
					
					s = s + '</div>' ;
				}
				k = k + 1;
				t.append(s);
			}
		}
		
		t.append('<div id="spacer" style="height:220px"></div>');
		$('#variable_height').css('width',$( document ).width()-10) ;
		$('#variable_height').css('height',$( document ).height()-200) ;
	});	
}

function LoadArticle(name){
	//Load Article
	console.log(name)
	jQuery.getJSON('../../home/main/articles/' + name +'.json',function(data){
		article = data.article;		
		//Get authors
		jQuery.getJSON('../../home/main/authors/authors.json',function(data){
			authors = data.authors;
			
			$('#article_title').empty().append(article.article_title);
			$('#article_text_text').empty().append(article.article);
			for(i=0;i<authors.length;i++){
				if(authors[i].name==article.article_author){
					$('#article_author_text').empty().append(authors[i].about);
					$('#author_image').css('background-image', "url(" + '../../home/main/authors/'+ authors[i].pic + ")");					
				}
			}
			$('#fbcommentplugin').empty().append('<div class="fb-comments" data-href="http://simaiisc.org/home/main/main_article_{0}.html" data-width="650" data-numposts="5"></div>'.format([article.article_title]));
		});
		
		console.log('Fetching galleries');
		jQuery.getJSON('../../static/pics/galleries/'+ article.galleries + '/gallery.json',function(data){
			galleries = data.galleries;
			console.log(galleries)
			SIMASliderInit();
		});
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
		
		var n = MainGallery.galleries.length;
		for(var i = 0 ; i < n ; i++){
		   MainGallery.el[i] =  $('#SMG_I{0}'.format([(i+1).toString()]));		  
		   MainGallery.el[i].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[i].pic + ")");
		   MainGallery.el[i].append(i.toString());
		}
		
		MainGallery.windows = [];
		MainGallery.windows[0] = [1,2,3,4,5];
		MainGallery.windows[1] = [8,9,10];
		MainGallery.windows[2] = [6,7,8,9,10];
		MainGallery.windows[3] = [0,1,2,3];
		MainGallery.flipped = false;
		
		MainGallery.wid = 0;
		MainGallery.iid = 0;
	});
   
}

function flip(){
  
  if(MainGallery.flipped==false){
	
    var wid = Math.floor((Math.random() * MainGallery.windows.length));
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
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-size','{0}px auto'.format([wt.toString()]));
	  
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-position','{0}px {1}px'.format([-x.toString(),-y.toString()]));
	}
  }else{
    var wid,iid;
	wid = MainGallery.wid;
	iid = MainGallery.iid;
	MainGallery.flipped = false;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[MainGallery.windows[wid][i]].pic + ")");
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-size','auto auto');
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-position','0px 0px');
	}
  }
}