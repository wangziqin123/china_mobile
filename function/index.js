$(function(){
//选项卡
	//获取操作元素
	var kuang1=$(".kuang1");
	var xia=$(".two2s");
	for(var i=0;i<kuang1.length;i++){
		kuang1[i].index=i;		//给每个对象添加一个index属性（相当于实际编号）
		kuang1[i].onmouseover=function(){
			xia[this.index].style.display="block"
		}
		kuang1[i].onmouseout=function(){
			xia[this.index].style.display="none"
		}
	}	
//无缝轮播
	//获取元素
	var imgs=$("a",$(".three2")[0]);
	var lis=$("li",$(".three2")[0]);
	var box=$(".three2")[0];
	var widths=parseInt(getStyle(box,"width"));
	var btnR=$(".yjt",box)[0];
	var btnL=$(".zjt",box)[0];
	var flag=true;
	//状态初始化，第0张left=0; 剩下的left=width
	lis[0].style.background="red";
	imgs[0].style.left=0;
	for(var i=0;i<imgs.length;i++){
		if(i==0){
			continue;
		}
		imgs[i].style.left=widths+"px";
	}
	//两个数，一个数记录当前页面的下标，另一个记录下一个页面的下标
	var index=0;
	var next=0;
	//设置时间函数，使之每隔一段时间进行变换
	var t=setInterval(moveR,3000);
	function moveR(){
		next++;
		//判断next是否超出范围
		if(next==imgs.length){
			next=0;
		}

		//每个图片和小圆点进行就位
		imgs[next].style.left=widths+"px";
		lis[index].style.background="#ccc";
		lis[next].style.background="red";
		//图片开始运动，当前图片left变为-widths，下一张图片在右边等候
		animate(imgs[index],{left:-widths});
		animate(imgs[next],{left:0},function(){
					flag=true;
				});
		index=next;
	}
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(moveR,3000);
	}
	//小圆圈选项卡,鼠标点击那个运动到相对应的图片
	for(var j=0;j<lis.length;j++){
		lis[j].index=j;
		//对lis添加点击事件 
		lis[j].onclick=function(){
			if(this.index==index){
				return;
			}if(this.index>index){
				imgs[this.index].style.left=widths+"px";
				lis[index].style.background="#ccc";
				lis[this.index].style.background="red";
				animate(imgs[index],{left:-widths});
				animate(imgs[this.index],{left:0},function(){
					flag=true;
				});
				next=this.index;
				index=next;
			}if(this.index<index){
				imgs[this.index].style.left=-widths+"px";
				lis[index].style.background="#ccc";
				lis[this.index].style.background="red";
				animate(imgs[index],{left:widths});
				animate(imgs[this.index],{left:0},function(){
					flag=true;
				});
				next=this.index;
				index=next;
			}
		}
	}
	function moveL(){
		next--;
		if(next<0){
			next=imgs.length-1;
		}
		imgs[next].style.left=-widths+"px";
		lis[index].style.background="#ccc";
		lis[next].style.background="red";
		animate(imgs[index],{left:widths});
		animate(imgs[next],{left:0},function(){
					flag=true;
				});
		index=next;
	}
	btnR.onclick=function(){
		if(flag){
			flag=false;
			moveR();
		}
	}
	btnL.onclick=function(){
		if(flag){
			flag=false;
			moveL();
		}
	}
//节点轮播
	//获取元素
	var four=$(".four")[0];
	var fours=$(".fours",four)[0];
	var fours1=$(".fours1",fours)[0];
	var xjt=$(".xjt",four)[0];
	var xjtL=$(".xjtL",xjt)[0];
	var xjtR=$(".xjtR",xjt)[0];
	var aw=parseInt(getStyle(fours1,"width"));
	var flag1=true;
	var dir=mover;
	var t1=setInterval(dir,5000);
	//图片从右往左运动，先动画，在扒图
	function mover(){
		var  first=firstChild(fours);
		animate(fours,{left:-aw},function(){   //function为回调函数
			fours.style.left=0;					//将盒子拖回
			firsts=first.cloneNode(true);	//将box的第一个子元素克隆，true代表子元素里边所有内容
			fours.removeChild(first);			//将一挪动的第一个子元素删除
			fours.appendChild(firsts);			//将克隆的子元素压入到最后一个子元素中
			flag1=true;
		})
	}
	//图片从左往右运动，先扒图后动画
	function movel(){
		var last=lastChild(fours);
		lasts=last.cloneNode(true);
		appendBefore(lasts,fours);
		fours.removeChild(last);
		fours.style.left=-aw+"px";
		animate(fours,{left:0},function(){
			flag1=true;
		})
	}
	//对右箭头设置点击事件
	xjtR.onclick=function(e){
		var ev=e||window.event;
		if(ev.type=="click"){
			clearInterval(t1);
			dir=mover;
			if(flag1){
				flag1=false
				mover();
			}
		}
		t1=setInterval(dir,5000);
	}	
	xjtL.onclick=function(e){
		var ev=e||window.event;
		if(ev.type=="click"){
			clearInterval(t1);
			dir=movel;
			if(flag1){
				flag1=false
				movel();
			}
		}
		t1=setInterval(dir,5000);
	}
	//对盒子添加鼠标移入事件
	fours.onmouseover=function(){				
		clearInterval(t1);
	}
	fours.onmouseout=function(){
		t1=setInterval(dir,5000);
	}
	xjt.onmouseout=function(){
		clearInterval(t1);
		t1=setInterval(dir,5000);
	}
//在线客服
	//单个设置
	/*
		var zxkfa1=$(".zxkfa1")[0];
		var zxkfa2=$(".zxkfa2")[0];
		var zxkfa3=$(".zxkfa3")[0];	
		zxkfa1.onmouseover=function(){
			animate(zxkfa1,{right:30});
		}
		zxkfa2.onmouseover=function(){
			animate(zxkfa2,{right:30});
		}
		zxkfa3.onmouseover=function(){
			animate(zxkfa3,{right:30});
		}
		zxkfa1.onmouseout=function(){
			animate(zxkfa1,{right:-30});
		}
		zxkfa2.onmouseout=function(){
			animate(zxkfa2,{right:-30});
		}
		zxkfa3.onmouseout=function(){
			animate(zxkfa3,{right:-30});
		}
	*/
	var zxkfa=$(".zxkfa");
	console.log(zxkfa);
	for(var k=0;k<zxkfa.length;k++){
	    zxkfa[k].index=k;
		zxkfa[k].onmouseover=function(){
			animate(zxkfa[this.index],{right:30});
		}
		zxkfa[k].onmouseout=function(){
			animate(zxkfa[this.index],{right:-30});
		}
	}


})