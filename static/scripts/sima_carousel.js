
    var image_id = 0 ; 
	var nImages  = 12;
	
	var imgs = new Array();
	var sima_carousel_context; 
 // Add a new Canvas and position 
    
     
	var timer=null; 
	var timer_main=null;
	var CarouselConfig =[]; 
    //Call setup to configure the Canvas 
    
         
    var t = 0;
	var nt = 20;
    var current_order = 0;
	var current_l_image = 0;
	var CarouselDir = 1;
	var Carousel_AutoRun = false;
	var image_load_sequence = [3,4,2,5,1,0,11,10,9,8,7,6];
	
	var setTime =  []; 
	
	setup(); 
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
		stopTimer() ;
		Carousel_AutoRun = false;
	}
	function MouseOffCarousel(){
		console.log("Out");
		Carousel_AutoRun = true;
		RunCarousel();
	}

    function OnImageLoad(){
	
	    if(image_id < nImages){
			var imid = image_load_sequence[image_id];
			imgs[imid] = new Image() ;
		//imgs[image_id] .src = '../../static/pics/main/' + background_images[image_id] + '.jpg';	
			imgs[imid] .src = '../../static/pics/main/' + 'bg{0}'.format([(imid+1).toString()]) + '.jpg';	
			imgs[imid] .onload = OnImageLoad;			
						
			
			//Partial Drawing Carousel
			if(image_id==1){				
				sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
				DrawImageOnCanvas(image_load_sequence[0],3,2,0);				
			}
			if(image_id==3){
				sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
				DrawImageOnCanvas(image_load_sequence[2],2,1,0);
				DrawImageOnCanvas(image_load_sequence[1],4,3,0);
				DrawImageOnCanvas(image_load_sequence[0],3,2,0);
			}
			if(image_id==5){
				sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
				DrawImageOnCanvas(image_load_sequence[4],1,0,0);
				DrawImageOnCanvas(image_load_sequence[3],5,4,0);
				DrawImageOnCanvas(image_load_sequence[2],2,1,0);
				DrawImageOnCanvas(image_load_sequence[1],4,3,0);
				DrawImageOnCanvas(image_load_sequence[0],3,2,0);
				setTime = new Date().getTime();
				
			}
			if(image_id>5){				
				if(setTime + 2000 < new Date().getTime()){
					Carousel_AutoRun=false;
					RunCarousel();
					setTime = new Date().getTime();
				}
			}
			image_id = image_id + 1;
		}else{
			console.log('Loaded Images');
			//DrawImages();
			//timer = setTimeout(function() {},1000); 
			stopTimer();
			Carousel_AutoRun=true;
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
		sima_carousel_context.drawImage(imgs[image_id],0,0,imgs[image_id].naturalWidth,imgs[image_id].naturalHeight,xloc,yloc,width,height);
		
	}
	function RunCarousel(){
	    t = 0;
		current_order=0;
		//console.log(current_l_image)
		DrawImages();
	}
	function DrawImages(){
		sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
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
			
			if(Carousel_AutoRun == true){
				timer_main = setTimeout(function() {RunCarousel()},2000); 
			}
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
        clearTimeout(timer_main);     
    } 
     
   
 
 