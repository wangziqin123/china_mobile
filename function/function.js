//解决ie6-8和w3c的getElementsByClassName 不兼容的函数
/*
	getClass(select)
	获取具有指定class的元素的集合
	select  指定的className
	context(fanwei)  指定的范围 如果不传入指定的范围,默认是documeent；
						如果传入则就在context中寻找
	

	思路：
		1、判断浏览器：
		getElemmentsByClassName
		2、获取指定元素
		  true   w3c
		  	focument.getElementsByClassName();
		  	false is6~8
		  	获取所有的元素
		  	遍历所有的元素
		  	筛选 obj.className==select
		  		arr.push(obj);
			return arr;
*/
function getClass(select,context){    //实参为one，fanwei
		var context=context?context:document;
		if(document.getElementsByClassName){
		 	return context.getElementsByClassName(select);  //w3c
		}else{               //ie6~8
	 		var all=context.getElementsByTagName("*");
	 		var arr=[];
	 		for(var i=0;i<all.length;i++){
	 			//每一个对象的className是否包含指定的select;
	 			if(checkClass(all[i].className,select)){
	 				arr.push(all[i]);
	 			}
	 		}
	 		return arr;
		}
	}
/******************************************************/
//每一个对象的className是否包含指定的select;
//classname=all[i].className  s=select
function checkClass(classname,s){
	var arr1=classname.split(" ");  //将传进来的类名进行分割成数组
	for(var k=0;k<arr1.length;k++){   //进行遍历数组，查看是否包含指定的select
		if(arr1[k]==s){
			return true;
		}
	}
	return false;
}
/***************************************************/
//$(string)  获取页面元素的函数
/*
	$(string) 获取页面中的元素

	string=".one"       获取指定"类名"的元素的集合
	string="#one"		获取指定"id"的元素的集合
	string="div"		获取指定"标签名"的元素的集合
思路：
	第一步：
		判断字符串的首字符
	第二步：
		.   		getClass()
		#  		    document.getElementById
		标签 		document.getElementByTagName
*/
/*
正则表达式
  /^[第一个字母范围][第二个字母范围]{字母最短,字母最长}$/
*/
function $(selector,context){
	if(typeof selector=="string"){
		context=context||document;
		if(selector.charAt(0)=="."){
			return getClass(selector.slice(1));
		}else if(selector.charAt(0)=="#"){
			return context.getElementById(selector.substring(1));
		}else if(/^[a-z][a-z1-6]{0,8}$/.test(selector)){
			return context.getElementsByTagName(selector);
		}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));   //添加元素节点
		}
	}else if(typeof selector=="function"){
		window.onload=function(){
		  selector();
		}
	}
}
/*****************************************************/
// setContent(one,val)  获取或者设置参数值
	//有参数传入，设置值，没有参数传入直接获取该元素参数值
/* 老师的思路：先进行判断是否传入有值，看是获取还是赋值；在判断浏览器，看使用哪个
 自己思路见5月3日作业*/
function setContext(obj,val){
	if(val){
		if(obj.innerText){
			obj.innerText=val;
		}else{
			obj.textContent=val;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
}
/****************************************************/
// getStyle(one,"width")     获取指定的元素的指定的样式
function getStyle(obj,attr){   //attr代表属性
	//先进性判断是哪个浏览器
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
/**/
}
/****************************************************/
//获取obj下所有满足type类型的子节点的集合  getChild 
//obj:指定的对象	type  获取子节点的类型
					//>>> undefined为不传入类型，获取所有元素节点
					//>>> 传入ture，获取所有元素节点
					//>>> 传入false，获取所有有意义的节点
/*
	思路：
		第一步：获取所有的子节点
		第二步：声明一个空数组
		第三步：遍历所有的子节点，
				通过子节点的类型往出拿
				true child[i].nodeType==1
				false child[i].nodeType==1||(child[i].nodeType==3&&!(/^\s+$/.test(child[i].nodeValue)))
		第四步：返回数组
*/
function getChild(obj,type){
	var type=type==undefined?true:type;
	var child=obj.childNodes;
	var arr=[];
	for(var i=0;i<child.length;i++){
		if(type===true){
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}
		}else{
			if(child[i].nodeType==1||(child[i].nodeType==3&&!(/^\s+$/.test(child[i].nodeValue)))){
				arr.push(child[i]);
			}
		}
	}
	return arr;
}
/*****************************************************/
/*
	firstChild(one);	获取第一个子元素
*/
function firstChild(obj,type){
	return getChild(obj,type)[0];
}
function lastChild(obj,type){
	var length=getChild(obj,type).length
	return getChild(obj,type)[length-1];
}

function randomChild(obj,type,num){    //传入实参的时候type不能省略
	return getChild(obj,type)[num]
}

/*****************************************************/
//getNext(obj);  获得下一个元素节点
/*
	思路： 
		第一步：判断obj是否有下一个兄弟元素
			没有   false
			有     更新next=next.nextSibling
					next  判断是否为空
			return next;
*/
function getNext1(obj){
	// var type=type==undefined?true:type;
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	while(next.nodeType==8||(next.nodeType==3&&!(/^\s+$/.test(next.nodeValue)))){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next;
}
function getNext2(obj){
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	while(next.nodeType==8||next.nodeType==3){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next;
}
function getNext(obj,type){
	if(type){
		return getNext1(obj,type);
	}else{
		return getNext2(obj,type);
	}
}
/**************************************************/
/*
	insertAfter(obj,obj1);
	将obj插入到obj1后边
	思路：将obj插入到obj1兄弟节点的后面
		第一步：获取obj1的下一个兄弟节点
		第二步：判断兄弟节点
			true parent.insertBefore(obj,next)
			false parent.appendChild(obj)
*/
function insertAfter(obj,obj1){
	var parent=obj1.parentNode;
	var next=getNext(obj1);
	if(next){
		parent.insertBefore(obj,next);
	}else{
		parent.appendChild(obj);
	}
}
/*****************************************************/
//将obj插入到obj1对象之前
function insertBefore(obj,obj1){
	var parent=obj1.parentNode;
	parent.insertBefore(obj,obj1);
}
/*****************************************************/
/*appendBefore(obj,objs)   objs是父元素
	将obj插入到父元素objs的最前面(给父元素的插入第一个子元素)
	思路：
		第一步：找到objs的第一个子元素
		第二步：判断是否有子元素
			true objs.insertBefore(obj,first);
			false objs.appendChild(obj);

*/
function appendBefore(obj,objs){
	var first=firstChild(objs);
	if(first){
		objs.insertBefore(obj,first);
	}else{
		objs.appendChild(obj);
	}
}