$(document).ready(function(){
	var miku = {};
	miku.background = "background/miku.jpg";
	miku.trace = "img/初音/";
	miku.name = "初音";
	miku.type = "folder";
	miku.datalist = [ 
	{name:"1.png",type:"img"}, 
	{name:"2.png",type:"img"}, 
	{name:"2015-11-19-235343.jpg",type:"img"}, 
	{name:"2015-11-19-235532.jpg",type:"img"},
	{name:"2015-11-19-235739.jpg",type:"img"}, 
	{name:"2015-11-19-235821.jpg",type:"img"}, 
	{name:"2015-11-19-235834.jpg",type:"img"}, 
	{name:"2015-11-19-235852.jpg",type:"img"},
	{name:"2015-11-19-235907.jpg",type:"img"},
	{name:"2015-11-20-001113.jpg",type:"img"},
	{name:"2015-11-20-001140.jpg",type:"img"},
	{name:"2015-11-20-001255.jpg",type:"img"},
	{name:"2015-11-20-001310.jpg",type:"img"},
	{name:"2015-11-20-001315.jpg",type:"img"}];

	var food = {};
	food.background = "background/food.jpg";
	food.trace = "img/食物/";
	food.name = "食物";
	food.type = "folder";
	food.datalist = [
		{name:"15_s.jpg",type:"img"},
		{name:"3225959_1.jpg",type:"img"}, 
		{name:"270136296_m.jpg",type:"img"},
		{name:"1378869773-726441913.jpg",type:"img"},
		{name:"1445314544-3278333991.jpg",type:"img"},
		{name:"9733807742_8c72195a22_o.jpg",type:"img"},
		{name:"a1.jpg",type:"img"},
		{name:"cm2.jpg",type:"img"},
		{name:"cm20151014___09.jpg",type:"img"},
		{name:"images (1).jpg",type:"img"},
		{name:"images (2).jpg",type:"img"},
		{name:"images.jpg",type:"img"},
		{name:"tainan04.jpg",type:"img"},
		{name:"zendastreet05.jpg",type:"img"},
		{name:"food1.jpg",type:"img"}, 
		{name:"food2.jpg",type:"img"}, 
		{name:"food3.jpg",type:"img"}, 
		{name:"food4.jpg",type:"img"}, 
		{name:"food5.jpg",type:"img"}, 
		{name:"food6.jpg",type:"img"}, 
		{name:"food7.jpg",type:"img"}, 
		{name:"food8.jpg",type:"img"}, 
		{name:"food9.jpg",type:"img"}, 
		{name:"food10.jpg",type:"img"}, 
		{name:"food11.jpg",type:"img"}, 
		{name:"food12.jpg",type:"img"}, 
		{name:"food13.jpg",type:"img"}, 
		{name:"food14.jpg",type:"img"}, 
		{name:"food15.jpg",type:"img"}, 
		{name:"food16.jpg",type:"img"}
	];

	var img = {};
	img.background = "background/img.jpg";
	img.trace = "img/";
	img.name = "img";
	img.type = "folder";
	img.datalist = [
		food,
		miku,
		{name:"120159898.png",type:"img"}, 
		{name:"1441689373-1274610415_n.jpg",type:"img"}
	];
	function fiximgshowposition(){
		var usablewidth = $(window).width();
		var usableheight = $(window).height()-120;
		var imgshowwidth = usablewidth * 0.8;
		var imgshowheight = usableheight * 0.8;
		$(".imgshow img").css("max-width",imgshowwidth+"px");
		$(".imgshow img").css("max-height",imgshowheight+"px");
		$(".imgshow").css("width",imgshowwidth+"px");
		$(".imgshow").css("height",imgshowheight+"px");
		$(".imgshow").css("margin-left",imgshowwidth/2*(-1)+"px");
		$(".imgshow").css("top",usableheight/2+"px");
		$(".imgshow").css("line-height",imgshowheight+"px");
		$(".imgshow").css("margin-top",imgshowheight/2*(-1)+"px");
	}
	fiximgshowposition();
	var nowroute = "img/";
	function makethumbnail(nowposition){
		$(".thumbernailwrappercontroller").html("");
		var marginleft = 240;
		$.each(nowposition.datalist,function(index, value){
			if(value.type == "img"){
				$(".thumbernailwrappercontroller").append('<div class="thumbernailwrapper" data-src="'+nowposition.trace+value.name+'" data-marginleft="'+marginleft+'px"><img class="thumbnail" src="'+nowposition.trace+value.name+'"></img></div>');
				marginleft -= 120;
			}
		});
		$(".thumbernailwrapper").click(function(){
			$(".imgshow img").attr("src",$(this).data("src"));
			$(".imgshow a").attr("href",$(this).data("src"));
			$(".imgshow a").attr("download",$(this).data("src").split('/')[$(this).data("src").split('/').length-1]);
			$(".thumbernailwrappercontroller").css("margin-left",$(this).data("marginleft"));
		});
	}
	function updatestatusbar(route){
		var stacktrace = "img/";
		$("#statusbar").html('<div class="buttonitem" data-trace="img/">根目錄</div>');
		for(var i = 1;i < (route.split('/').length-1);i++){
			$("#statusbar").append('<div class="divideitem">></div>');
			$("#statusbar").append('<div class="buttonitem" data-trace="'+stacktrace+route.split('/')[i]+'/">'+route.split('/')[i]+'</div>');
			stacktrace += route.split('/')[i]+'/';
		}
		$(".buttonitem").click(function(){
			nowroute = $(this).data("trace");
			createitem(nowroute);
		});
	}
	var imgamount;
	function createitem(route){
		var nowposition = img;
		for(var i = 2;i < route.split('/').length;i++){
			var target = route.split('/')[i-1];
			$.each(nowposition.datalist,function(index, value){
				if(value.name == target){
					nowposition = value;
				}
			});
		}
		$("#background").attr("src",nowposition.background);
		$("#itemshower").html("");
		imgamount = 0;
		var marginleft = 240;
		$.each(nowposition.datalist,function(index, value){
			var itemstring = '';
			if(value.type == "folder"){
				itemstring += '<div class="folder item" data-trace="'+value.trace+'"">';
				itemstring += '<div class="iconwrapper">';
				itemstring += '<img class="icon" src="folder.png"></img></div>';
			}else if(value.type == "img"){
				itemstring += '<div class="img item" data-src="'+nowposition.trace+value.name+'" data-marginleft="'+marginleft+'px">';
				itemstring += '<div class="iconwrapper">';
				itemstring += '<img class="icon" src="'+nowposition.trace+value.name+'"></img></div>';
				imgamount++;
				marginleft-=120;
			}

			itemstring+='<div class="itemnamewrapper"><div class="itemname">'+value.name+'</div></div>';

			$("#itemshower").append(itemstring);
			updatestatusbar(route);
			$(".folder.item").click(function(){
				nowroute = $(this).data("trace");
				createitem(nowroute);
			});
			$(".img.item").click(function(){
				$(".imgshow img").attr("src",$(this).data("src"));
				$(".imgshow a").attr("href",$(this).data("src"));
				$(".imgshow a").attr("download",$(this).data("src").split('/')[$(this).data("src").split('/').length-1]);
				$(".thumbernailwrappercontroller").css("margin-left",$(this).data("marginleft"));
				openplaymode();
			});
			//$("#thumbnailviewer").
			makethumbnail(nowposition);
		});
	}
	function playforward(){
		if(((parseInt($(".thumbernailwrappercontroller").css("margin-left").slice(0,-2))-240)*(-1)/120) < $(".thumbnail").length-1){
			$(".thumbernailwrapper")[((parseInt($(".thumbernailwrappercontroller").css("margin-left").slice(0,-2))-240)*(-1)/120)+1].click();
		}else{
			$(".thumbernailwrapper")[0].click();
		}
	}
	function autoplay(){
		setTimeout(function(){
			playforward();
			autoplay();
		},2000);
	}
	function setautoplayclickevent(){
		$("#autoplay").click(function(){
			autoplay();
			$("#autoplay").addClass('autoplaying');
			$("#autoplay").unbind();
			$("#autoplay").click(function(){
				$("#autoplay").removeClass('autoplaying');
				var id = window.setTimeout(function() {}, 0);
				while (id--) {
				    window.clearTimeout(id);
				}
				setautoplayclickevent();
			});
		});
	}
	function openplaymode(){
		var id = window.setTimeout(function() {}, 0);
		while (id--) {
		 	window.clearTimeout(id);
		}
		$(".fade").addClass('active');
		$(".thumbnailviewer").addClass('active');
		$(".imgshow").addClass('active');
		$("#autoplay").addClass('active');
		$(".fade.active").click(function(){
			closeplaymode();
		});
		setautoplayclickevent();
	}
	createitem(nowroute);
	$(".fade").css("height",$(window).height()+200);
	function closeplaymode(){
		$(".fade").removeClass('active');
		$(".thumbnailviewer").removeClass('active');
		$(".imgshow").removeClass('active');
		$("#autoplay").removeClass('active');
		$("#autoplay").removeClass('autoplaying');
		var id = window.setTimeout(function() {}, 0);
		while (id--) {
		 	window.clearTimeout(id);
		}
		$("#autoplay").unbind();
	}
	var nowsong = 0;
	var songsrc = [
		"res/senbonsakura.mp3",
		"res/UnhappyRefrain.mp3",
		"res/sekaisehu.mp3"
	];
	$('#myaudio').on('ended', function() {
   		nowsong = (nowsong+1)%3;
   		console.log(123);
   		$('#myaudio')[0].setAttribute('src', songsrc[nowsong]); 
   		$('#myaudio')[0].play();
	});
});