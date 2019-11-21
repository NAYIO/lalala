var timer = null,
    index = 0,
    pics = document.getElementsByClassName("banner-slide"),
    lis = document.getElementsByClassName("dot"); 
    pre = document.getElementById('pre');
    next = document.getElementById('next');
    all = document.getElementById('all');
function slideImg() {
    var main = document.getElementById('main');
    main.onmouseover = function(){
        stopAutoPlay();
    }
    main.onmouseout = function(){
        startAutoPlay();
    }
    startAutoPlay();
    //点击导航栏切换图片
    for(var i=0;i<pics.length;i++){
        lis[i].onclick = function(){
          //获取当前li项的index值
            index = this.index;
            changeImg();
        }
    }
}
pre.onclick = function(){
    if(index==0){
        index = 4;
    }
    else{
        index = index-1;
    }
    changeImg();
}
next.onclick = function(){
    if(index==4){
        index = 0;
    }
    else{
        index = index+1;
    }
    changeImg();
}
//开始播放轮播图 index:0 1 2 3 4 
function startAutoPlay(){
    timer = setInterval(function(){
        if(index>4){
            index = 0;
        }
        changeImg();
        index++;
    },2500);
}
//暂停播放
function stopAutoPlay(){
    if (timer) {
        clearInterval(timer);
    }
}
//改变轮播图
function changeImg(){
    for(var i=0;i<pics.length;i++){
        pics[i].style.display = "none";
        lis[i].id = "do";
    }
    pics[index].style.display = "block";
    lis[index].id = "changeColor";
    switch(index){
        case 0: all.className='all one';break;
        case 1: all.className='all two';break;
        case 2: all.className='all three';break;
        case 3: all.className='all four';break;
        case 4: all.className='all five';break;

    }
}
slideImg();
var containerPicture=document.getElementsByClassName("containerPicture");
var tag1=document.getElementsByClassName('lable1');
var tag2=document.getElementsByClassName('lable2');
var level=document.getElementsByClassName('level');
var price=document.getElementsByClassName('price');
var title=document.getElementsByClassName('title');
var people=document.getElementsByClassName('people');
function resource()
    {
        $.ajax({
                url:"http://47.98.44.91:7001/list",
                type:'get',
                datatype:'json',
                success:function(res)
                {
                    console.log(res);  //在console中查看数据
                    $.each(res,function(index,obj){
                        var info= $.parseJSON(obj.appInfo)
                        tags=eval("("+info.tags+")");
                        containerPicture[index].src=info.backgroundImage;
                        tag1[index].innerHTML=tags[0];
                        if(tags[1]==null){
                            tag2[index].innerHTML=null;
                        }
                        else{
                            tag2[index].innerHTML=tags[1];
                        }
                        level[index].innerHTML=info.rate;
                        price[index].innerHTML=info.price;
                        title[index].innerHTML=info.title;
                        people[index].innerHTML=info.people;
                    });
                                            
                }
            })
    }
resource();