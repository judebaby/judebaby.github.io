
var slider_timer;

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
	
	slider_timer  = setInterval('slide("left")', 5000);
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
	
	SIMASlider.temp++;
	if(SIMASlider.temp==5){
		SIMASlider.temp=0;
		SIMASliderSelectRoll(SwitchGallery(-1));
	}    
}