
    var image_id = 0 ; 
	var nImages  = 12;
	
	var imgs = new Array();
	var sima_carousel_context; 
 // Add a new Canvas and position 
    
     
	var timer=null; 
	var CarouselConfig =[]; 
    //Call setup to configure the Canvas 
    setup(); 
         
    var t = 0;
	var nt = 20;
    var current_order = 0;
	var current_l_image = 0;
	var CarouselDir = 1;
    function setup() { 
	
		var w = $( window ).width();
		w = w > 1024 ? 1024: w;
		$('#content').width(w);
		
		$('#SIMA_MainCarousel'). 
		addClass('Fixed_Position'). 
		append('<canvas id="my-canvas"  width="1200" height="800"> </canvas>'); 
	
		$('#SIMA_MainCarousel').hover(MouseOnCarousel,MouseOffCarousel);
		
        var canvas=document.getElementById("my-canvas"); 
		
		CarouselConfig.carousel_height = 275;
		CarouselConfig.main_img_width  = 456;
		CarouselConfig.config = [[0.5,0,0],[0.7,0,1],[0.89,59,1],[1,147,1],[0.89,285,1],[0.7,431,1],[0.5,431,0]];
		
		var zoom = w/750;		
		CarouselConfig.carousel_height = CarouselConfig.carousel_height*zoom;
		CarouselConfig.main_img_width  = CarouselConfig.main_img_width*zoom;		
		for (var i = 0 ; i < 7;i++){
		   CarouselConfig.config[i][1] = CarouselConfig.config[i][1]*zoom;
		}
		
		sima_carousel_context = canvas.getContext("2d"); 
        canvas.width=w;
		canvas.height=CarouselConfig.carousel_height;
		
		
		
	    CarouselConfig.DrawOrder = [[0,1,5,2,4,3],[5,0,4,1,3,2],[0,1,5,2,4,3]];
		current_order = 0;
		OnImageLoad();
		
    } 
	
	function MouseOnCarousel(){
		console.log("In");
		//RunCarousel();
		stopTimer() ;
	}
	function MouseOffCarousel(){
		console.log("Out");
		RunCarousel();
	}
    function OnImageLoad(){
	
	    if(image_id < nImages){
			imgs[image_id] = new Image() ;
		//imgs[image_id] .src = '../../static/pics/main/' + background_images[image_id] + '.jpg';	
			imgs[image_id] .src = '../../static/pics/main/' + 'bg{0}'.format([(image_id+1).toString()]) + '.jpg';	
			imgs[image_id] .onload = OnImageLoad;
			image_id = image_id + 1;
			console.log(image_id);
		}else{
			console.log('Loaded Images');
			//DrawImages();
			//timer = setTimeout(function() {},1000); 
			RunCarousel();
		}
		//UpdateCarousel();
	}
	//Config = [zoom,xloc,opacity]
	
	function DrawImageOnCanvas(image_id,config_id_s,config_id_e,l){
	    //console.log([image_id,config_id_s,config_id_e,l])
		var zoom  = CarouselConfig.config[config_id_s][0] + (CarouselConfig.config[config_id_e][0]-CarouselConfig.config[config_id_s][0])*l;
		var xloc  = CarouselConfig.config[config_id_s][1] + (CarouselConfig.config[config_id_e][1]-CarouselConfig.config[config_id_s][1])*l;
		var alpha = CarouselConfig.config[config_id_s][2] + (CarouselConfig.config[config_id_e][2]-CarouselConfig.config[config_id_s][2])*l;
		sima_carousel_context.globalAlpha = alpha;
		var yloc = CarouselConfig.carousel_height*(1-zoom)*0.5;
		var height = CarouselConfig.carousel_height*zoom;
		var width = CarouselConfig.main_img_width*zoom;	
		sima_carousel_context.drawImage(imgs[image_id],0,0,imgs[0].naturalWidth,imgs[0].naturalHeight,xloc,yloc,width,height);
		
	}
	function RunCarousel(){
	    t = 0;
		current_order=0;
		//console.log(current_l_image)
		DrawImages();
	}
	function DrawImages(){
		sima_carousel_context.clearRect(0, 0, 1200,800);
		var l = t/nt;
	
		for(var i=0;i<CarouselConfig.config.length-1;i++){
		  var j = CarouselConfig.DrawOrder[current_order][i];
		  var imid = current_l_image + j;
		  imid = imid > (imgs.length - 1) ? imid - imgs.length : imid ;
		  if(CarouselDir==1)   DrawImageOnCanvas(imid,j,j+1,l);
		  else DrawImageOnCanvas(imid,j+1,j,l);
		}
		
		t = t + 1;
		if(t==nt/2){
			current_order = CarouselDir==1?1:2;
		}
		if(t<nt){
		  timer = setTimeout(function() {DrawImages()},10); 
		}else{
			current_l_image = current_l_image - CarouselDir ;
			current_l_image = current_l_image == imgs.length ? 0 : current_l_image;
			current_l_image = current_l_image == -1 ? imgs.length-1 : current_l_image;
			timer = setTimeout(function() {RunCarousel()},2000); 
		}
	}
	function UpdateCarousel(){		
		console.log('Drawing Carousel..')
		sima_carousel_context.drawImage(imgs[0],50,25,400,400);
		sima_carousel_context.globalAlpha = 0.5;
		sima_carousel_context.drawImage(imgs[0],480,130,200,200,0,100,100,200);
		console.log(imgs[0].naturalWidth )
	}
   
     
    function stopTimer() { 
        clearTimeout(timer);     
    } 
     
   
 
 