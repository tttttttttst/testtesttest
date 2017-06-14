(function($){
    //星の領域
    var $stars=$("#stars");
    //リンクボタン
    var $linkBtn=$(".linkBtn");
    //星の領域の寸法
    var areaWidth=$stars.innerWidth();
    var areaHeight=$stars.innerHeight();
    //星のコンテナの総数
    var NUM_TOTAL_CLUSTER=12;
    //1つのコンテナの中の星の数
    var NUM_TOTAL_STARTS_IN_CLUSTER=20;
    //読み込んだ星の画像の数
    var loadCount=0;
    //星の画像のURL
    var imgURLs=[
        "img/star1.png",
        "img/star2.png",
        "img/star3.png"
    ];
    //コンテナをjQuery Objectとして保持するための配列
    var clusters=[];
    //読み込んだ星の画像をjQuery Objectとして保持するための配列
    var starImgs=[];
    
    var linkURLs=["#1"];
    
    (function init(){
        //初期化
        //コンテナ生成
        console.log("********** init!! **********");
        var _baseX=areaWidth*0.5;
        var _baseY=areaHeight*0.5;
        var _i=0;
        var _l=NUM_TOTAL_CLUSTER;
        var _deg=(360-90)/NUM_TOTAL_CLUSTER;
        var _$div=$("<div>");
        for(_i;_i<_l;_i++){
            _$div=_$div.clone();
            _$div.css({"visibility":"hidden","position":"absolute","left":-Math.cos((_i*(_deg)-90)*Math.PI/180)*_baseX+_baseX,"top":Math.sin((_i*(_deg)-90)*Math.PI/180)*_baseY*0.5+_baseY,"transform":"scale("+1+")"});
            clusters.push(_$div.clone());
        }
        $stars.append(clusters);
        //ボタン設定
        $linkBtn.on("click",function(e){
            e.preventDefault();   
            console.log(e.pageX,e.pageY);
            startAnimation(linkURLs[$(e.currentTarget).index()],e.pageX,e.pageY); 
        });
        //星の画像を読み込み
        loadItems();
    })();
    
    function loadItems(){
        //星の画像を読み込み
        var _i=0;
        var _l=imgURLs.length;
        var _$img=$("<img>");
        for(_i;_i<_l;_i++){
            _$img=_$img.clone()
            //ロードを監視
            _$img.on("load",onImgLoad).attr({"src":imgURLs[_i]});
            starImgs.push(_$img.clone());
        }
    }
    /*
    function adjustClusterspositions(_baseX,_baseY){
        var _i=0;
        var _l=NUM_TOTAL_CLUSTER;
        var _deg=(360-90)/NUM_TOTAL_CLUSTER;
        var _$div;
        for(_i;_i<_l;_i++){
            _$div=clusters[_i];
            _$div.css({"visibility":"hidden","position":"absolute","left":-Math.cos((_i*(_deg)-90)*Math.PI/180)*_baseX+_baseX,"top":Math.sin((_i*(_deg)-90)*Math.PI/180)*_baseY*0.5+_baseY,"transform":"scale("+1+")"});
        }
    }
    */
    function attachStars(){
        //星を配置
        var _baseX=areaWidth*0.5;
        var _baseY=areaHeight*0.5;
        var _i=0;
        var _j=0;
        var _l=NUM_TOTAL_CLUSTER;
        var _k=NUM_TOTAL_STARTS_IN_CLUSTER;
        var _random=Math.random()*100;
        var _$item;
        var _items=[];
        
        //星をコンテナにランダム配置
        for(_i;_i<_l;_i++){
            _items=[];
            for(_j=0;_j<_k;_j++){
                _$item=starImgs[Math.floor(Math.random()*3)].clone();
                _$item.css({/*"visibility":"hidden",*/"position":"absolute","left":Math.random()*(20*_i+50),"top":Math.random()*(20*_i+50),"transform":"scale("+0.5+(Math.floor(Math.random()*10)+1)*0.05+")"});
                _items.push(_$item);
            }
            clusters[_i].append(_items);
        }
        //startAnimation();
    }
    
    function startAnimation(_linkURL,_x,_y){
        var _i=0;
        var _l=NUM_TOTAL_CLUSTER;
        var _tl=new TimelineLite();
        var _$item;
        //console.log(_linkURL);
        //$starsを表示
        $stars.css({"left":(_x-$stars.width())*0.5,"top":(_y-$stars.height())*0.5,"display":"block"});
        
        for(_i;_i<_l;_i++){
            _$item=clusters[_i]
            _tl.add(TweenLite.to(_$item,0.2,{autoAlpha:1,delay:(_i!==0)?-0.15:0}));
        }
        for(_i=0;_i<_l;_i++){
            _$item=clusters[_i]
            _tl.add(TweenLite.to(_$item,0.5,{autoAlpha:0,delay:-0.45}));
        }
        _tl.vars.onComplete=function(){
            location.href=_linkURL;    
        }
        _tl.pause();
        _tl.play();
    }
    
    function onImgLoad(){
        //星の画像読み込みハンドラ
        loadCount++;
        //読み込んだ星の画像の数が、星の画像のURLと等しかったら星を配置
        if(loadCount===imgURLs.length){
            attachStars();
        }
    }
    
})(jQuery);