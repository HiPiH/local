




//63



/*var ArrayCirle = Class.create({
    initialize:function()
    {
        this.arr = $A([]);
        var temp_arr = $A([]);
        $R(-10, 10).each(function(item){
            temp_arr.push(null);
        }.bind(this));
        $R(-10, 10).each(function(item){
            this.arr.push(temp_arr.clone());
        }.bind(this));
    },

    add:function(obj,x,y)
    {

    }


})
var new_Circle= Class.create(Circle,{

    new_destroy:function(){
        
        this.destroy();
    }
});

var colors = $A([
    new Color(255,0,0),
    new Color(0,255,0),
    new Color(0,0,255)
]),arr=new ArrayCirle(),cur,arr2=$A([]);

for(var x =-10;x<10;x++)
{

    for(var y=-10; y<10;y++)
    {
       
        arr.add(
            new new_Circle([Clickable],$P(x*22,y*22 ),10).
                set({
                "stroke":$C(100,100,100),
                "fill":colors[Math.round(Math.random()*2)]}).
                addEvent("click",function(obj){
                       this.new_destroy();
                    }
                ),x,y);
    }

}*/

//var t = Class.create({test:true});
//var t2 = Class.create({test2:true});
//p.deletePoints(1,pp);
//p.ext(t,t2);
//p.insertPoints(1,$P(3,4));
//var pp = $P(0,0)

/*var p = new Path(
    [Dropable],
    $P(0,0),$P(0,100),$P(100,100),$P(100,0))
    .set({
        "stroke":$C(100,100,100),
        "fill":$C(200,200,200 )
    });*/
/*
var p = new Rectage(
    [Dropable],
    $P(-50,-50),$S(50,50))
    .set({
        "stroke":$C(100,100,100),
        "fill":$C(200,200,200 )
    }).addEvent("collision",function(obj,p){
        //Log('1');
    }).addEvent("drop",function(obj){
        Log("drop");
        this.reSize($S(100,100))
    });*/




    /*.addEvent("collisionin",function(obj){
        Log("collisionin");
    }).addEvent("collisionout",function(obj){
        Log("collisionout");
    })*/
/*
for(var x = 0 ;x<100;x++)
{
var p = new Path(
    [Dropable],
    $P(0,0),$P(0,-10),$P(-10,-10),$P(-10,0))
    .set({
        "stroke":$C(100,100,100),
        "fill":$C(200,200,200 )
    }).translate($P(10*x,0));
}*/






/*var colors = $A([
    new Color(255,0,0),
    new Color(0,255,0),
    new Color(0,0,255)
]);
var schet = new Text($P(0,0),"11111111");
var schot = 0;
var Button = Class.create({
    initialize:function(x,y)
    {
        this.hide =false;
        this.color = colors[Math.round(Math.random()*2)];
        this.obj = new PObject(
                new Circle($P(10,10),10).
                    translate($P((x*21),y*21)).
                    translate($P(-200,-200)).
                    setFill(this.color)
            );

        this.obj.setMove(false);
        
        this.obj.addEvent("mousedown",function(){

            var t = this.ActionDelete();
            schot += t;
            Log(schot);
            resize();
        }.bind(this)
        );
        this.x = x;
        this.y = y;
    },
    move:function(x,y)
    {
        this.obj.translate($P((x-this.x)*21,(y-this.y)*21),2);
        this.x=x;
        this.y=y;
    },
    ActionDelete : function()
    {
        var count = 0,tx = [(this.x-1>=0?this.x-1:0),(this.x+1<=19?this.x+1:19)],ty=[(this.y-1>=0?this.y-1:0),(this.y+1<=19?this.y+1:19)];
        games[this.x][this.y] = null;

        this.obj.del();

        $R(tx[0],tx[1]).each(function(item){
            if(item == this.x)return;
            if(games[item][this.y] != null)
            {
                if(games[item][this.y].color.equal(this.color))
                {
                    count++;
                    count += games[item][this.y].ActionDelete();
                    return;
                }
            }
        }.bind(this));

        $R(ty[0],ty[1]).each(function(item)
        {
                  if(item == this.x)return;
                  if(games[this.x][item] != null)
                  {
                      if(games[this.x][item].color.equal(this.color))
                      {
                          count++;
                          count += games[ this.x][item].ActionDelete();
                          return;
                      }
                  }
         }.bind(this));
                
        return count;
    }
})
var games =$A([]);
var resize = function()
{

    games.each(function(item,x){

       games[x] =  item.compact();
       if(games[x].length == 0)
       {
            games[x]= null;
          
       }else{
           games[x].each(function(item2,y){
               if(item2 != null)
               {
                   item2.move(x,y);
               }
           });
       }
    });


};

 (function(xs,ys)
{
    var arr = $A([]),x=-1,y=-1,p_fill  = new Color(100,100,200),color=0,line=$A([]),obj;
    while((x++)<xs)
    {

        while((y++)<ys)
        {
             line.push( new Button(x,y));



        }
        games.push(line);
        line=$A([]);
        y = -1;
    }
    
    return arr;
})(19,19);



*/


















/*
new PObject(
    {

        setDrugable:function(status){
            if(status==1)
            {

            }
            if(status==2)
            {
               var p = _Canvas.inPole(this);
               if(p)
               {
                   this.translate(p);
               }
            }
            if(status==3)
            {

            }

        },
        setUpdate:function()
        {
            //this.translate([1,0]);
            return false;
        }
    },
    new Rectage({setFill :  new Color(100,300,100)},$P(210,10),$P(50,70)),
    new Path({setFill : new Color(100,100,100)},[10,10],[10,200],[200,200],[200,10]),
    new Circle({setFill :  new Color(100,100,100)},[100,100],100),
    new ImagePath({},$P(300,210),"http://localhost:8000/media/end.jpg")
    
);
*/




/*
new PObject(
    {
        setUpdate:function()
        {
            //this.translate([1,0]);
            return false;
        }
    },
    (function(xs,ys)
    {
        var arr = $A([]),x=-1,y=-1,p_fill  = new Color(100,100,200),color=0;
        while((x++)<xs)
        {
            while((y++)<ys)
            {
                color = Math.round(Math.random()*2);
                arr.push(new Circle({setFill :  colors[color]},$P(10,10),5).translate($P((x*11),y*11)));
                
                //arr.push(new Rectage({setFill :  p_fill},$P(10,10),$P(20,20)).translate($P((x*21),y*21)));
            }
            y = -1;
        }
        return arr;
    })(20,20)
);
*/



//.addEvent("mousedown",function(){Log("click1");}).addEvent("mouseup",function(){Log("click2");});





//var p  = new Path([10,10],[10,40],[40,40],[40,10]);
//var c  = new Path($P(0,0),$P(20,20));
//Log(p.toString());
//Log(c.toString());
/*Log(p._points_guard);
p.get(0).sum([-2,-2]);
Log(p.get(0));
Log(p._points_guard);*/
//Log(p.isClose()._close);















/*var Log = function(text){if(typeof console !== "undefined" && arguments.length>0)console.log(arguments.length==1?arguments[0]:arguments);}
Object.extend(Array.prototype,{
    each_true:
            function(iterator, context) {
                for (var i = 0, length = this.length >>> 0; i < length; i++)
                {
                    if (i in this)
                        if(iterator.call(context, this[i], i, this))break;
                }
            }

});
Object.extend(Object.prototype,{
    _event_queueu:null,
    addEvent:function(src,fn)
    {
        var _t;
        if(!this._event_queueu)this._event_queueu = new Hash();
        _t  = this._event_queueu.get(src);
        if(_t){
            _t.push(fn.bind(this));
        }else{
            this._event_queueu.set(src,$A([fn.bind(this)]));
        }
        return this;
    },
    fireEvent:function(src,param)
    {
        var _t;
        if(this._event_queueu != null)
        {
            _t = this._event_queueu.get(src);
            if(_t){
                _t.each((function(fn){fn(this,param);}));
            }
        }
    }
});

 //--------------------------------------------------//
var Queue = Class.create({
  _queue:new Array(),_timer: null,_my_fn:null,
  _exec:function(pe){if(this._queue.size()>0){this._my_fn(this,this._queue[0]);this._queue.shift();}},
  initialize: function(fn,interval) {var parent = this;this._my_fn = fn;this._timer = new PeriodicalExecuter(function(){parent._exec()}, interval||0.1); },add:function(obj){this._queue.push(obj);}
});


//--------------------------------------------------//
var Classificator = Class.create({
    _classif:new Hash(),
    setClassif:function(classif,id)
    {
        classif = classif.toLowerCase();
        var _t  = this._classif.get(classif);
        if(_t)
        {
            _t.push(id);
            _t.uniq();
        }else{
             this._classif.set(classif,$A([id]));
        }
    },
    unsetClassif:function(classif,id)
    {
        classif = classif.toLowerCase();
        var _t  = this._classif.get(classif);
        if(_t){_t.without(id);}
    },
    getClassif:function(classif)
    {
        return this._classif.get(classif.toLowerCase())||$A([]);

    }
});


//--------------------------------------------------//
var Point = Class.create({
    x:0,
    y:0,
    _change:function(){this.fireEvent("change");},
    initialize:function(param1,param2)
    {
        if(typeof (param1) == "object")
        {
            if(param1 instanceof Point)
            {
                this.x = param1.x; this.y = param1.y;
            }else if(param1 instanceof Array)
            {
                this.x = param1[0]; this.y = param1[1];
            }
        }
        if(typeof (param1) == "number")
        {
            this.x = param1;this.y = param2||param1;
        }
    },
    toString: function() {return '{ x: ' + (this.x) + ', y: ' + (this.y) + ' }';},
    sum:function(){var p = this;$A(arguments).each(function(item){var t = new Point(item);p.x += t.x;p.y += t.y;});this._change();return this;},
    div:function(){var p = this;$A(arguments).each(function(item){var t = new Point(item);p.x /= t.x;p.y /= t.y;});this._change();return this;},
    sub:function(){var p = this;$A(arguments).each(function(item){var t = new Point(item);p.x -= t.x;p.y -= t.y;});this._change();return this;},
    mul:function(){var p = this;$A(arguments).each(function(item){var t = new Point(item);p.x *= t.x;p.y *= t.y;});this._change();return this;},
    mod:function(){var p = this;$A(arguments).each(function(item){var t = new Point(item);p.x %= t.x;p.y %= t.y;});this._change();return this;},
    neg:function(){return  new Point(-this.x,-this.y);},
    rotate: function(angle, center) {angle = angle * Math.PI / 180;var point = center ? this.sub(center) : this,s = Math.sin(angle),c = Math.cos(angle);point = new Point(point.x * c - point.y * s,point.y * c + point.x * s);this._change();return center ? point.sum(center) : point;},
    equals: function(point) {return this.x == point.x && this.y == point.y;},
    isZero: function() {return this.x == 0 && this.y == 0;},
    move:function(x,y){if(x instanceof Point){this.x = x.x;this.y = x.y;}else{this.x = x;this.y = y;}},
    translate:function(x,y){if(x instanceof Point){this.sum(x);}else{this.x += x;this.y += y;}},
    equal:function(point){return point.x == this.x && point.y == this.y;}
});



//--------------------------------------------------//
var Path = Class.create({
    _id:-1,
    _drug:false,
    _update:null,
    _points:null,
    _board:null,
    _fill:null,
    _stroke:null,
    _event_queueu:null,
    initialize:function(points)
    {
        this._points = new Array();
        this._board = [new Point(),new Point()];
        this._update = true;
        var x = 0,obj;
        for(;x<arguments.length;)
        {
            obj = arguments[x++];
            this.addPoint(obj);
        }
        this._id = _Scene.addPath(this);
    },
    summaryBord:function(obj)
    {
           // Log("change"+obj.x);
    },
    translate:function(delta){this._points.each(function(item){item.sum(delta);});return this.upd();},
    setFill:function(fill){this._fill = fill;return this.upd();},
    setStroke:function(stroke){this._stroke = stroke;return this.upd();},
    setClick:function(flag){this[(flag||true)?"setClassif":"unsetClassif"]("click");return this;},
    setMove:function(flag){this[(flag||true)?"setClassif":"unsetClassif"]("move");return this;},
    setDraw:function(flag){this[(flag||true)?"setClassif":"unsetClassif"]("draw");return this;},
    setFocuse:function(flag){this[(flag||true)?"setClassif":"unsetClassif"]("focuse");return this;},
    addPoint:function(point){
        var x = 0;
        if(typeof point != "array")
        {
            point = [point];
            for(;x<point.length;x++)
            {
                var p = new Point(point[x]);
                p.addEvent("change",(this.summaryBord.bind(this)));
                this._points.push(p);
            }
        }
        return this.upd();
    },
    content:function(a1,a2){
        function _PI(A,B)
        {
            return ( (a1.y-A.y)*(B.x-A.x)-(a1.x-A.x)*(B.y-A.y) ==0);
        }
        function _PIT(A,B,C)
        {
            var res = (B.x-A.x)*(C.y-A.y)-(B.y-A.y)*(C.x-A.x);
            return res==0?0:((res>0)?1:-1);

        }
        var x = 2,p1=this._points[0],p2=this._points[1],p3=this._points[2];
        if(!(a1 instanceof Point))
        {
            if(typeof a1 == 'array')
            {a1 = new Point(a1);}else{a1 = new Point(a1,a2);}
        }
        if(this._points.length > 0)
        {
            
            if(this._points.length == 1)
            {
                return p1.equal(a1);
            }
            else if(this._points.length == 2)
            {
                return  _PI(p1,p2);
            }else{
                for(;x<this._points.length;x++)
                {
                    p1 =  this._points[x-2];
                    p2 =  this._points[x-1];
                    p3 =  this._points[x];
                    if(p1.equal(a1) || p2.equal(a1)||p3.equal(a1))return true;
                    if(_PI(p1,p2)||_PI(p2,p3) || _PI(p3,p1))return true;
                    if(_PIT(p1,p2,a1)* _PIT(p2,p3,a1)*_PIT(p3,p1,a1)> 0) return true;
                }
            }
        }
        return false;
    },
    get:function(index){return (index?(this._points[index] || new Point(0,0)):this._points);},
    setClassif:function(classificator){_Classif.setClassif(classificator,this._id);return this;},
    unsetClassif:function(classificator){_Classif.unsetClassif(classificator,this._id);return this;},
    update:function(){return this._update;},
    upd:function(){this._update = true;return this;},

    draw:function(){
        this._update = false;
        this.fireEvent("draw");
        if( this._points.length == 0)return;
        _Canvas.begin();
        var first = true;
        _Canvas.moveTo(this._points[0].x,this._points[0].y);
        this._points.each(function(item){if(first){first = false;}else{_Canvas.lineTo(item.x,item.y);}});
        _Canvas.lineTo(this._points[0].x,this._points[0].y);
        if(this._fill != null)
        {
            _Canvas.fillStyle(this._fill);
            _Canvas.fill();
        }
        if(this._stroke != null)
        {
            _Canvas.strokeStyle(this._stroke);
            _Canvas.stroke();
        }
        _Canvas.end();
    
    },
    toString:function(){var ret = "{";this._points.each(function(item){ret += item.toString();});return ret+"}";}
    //+ разбить на сертку всё поле
});

var Rectangle = function(param1,param2){
    param2 = new Point(param2);
    var p1 = new Point(param1);
    var p2 = new Point(param1);
    var p3 = new Point(param1).sum(param2);
    var p4 = new Point(param1);
    p2.x += param2.x;
    p4.y += param2.y;
    return new Path(p1,p2,p3,p4);
};


var AjaxQueue = Class.create(Queue,{
        _send:function(queue,param){new Ajax.Request(param[0],param[1]);},
        initialize:function($super){$super(this._send);},
        send:function(url,param,onSuccess,method,onFailure){this.add([url,{parameters:param||{},method:method||'get',onSuccess:onSuccess,onFailure:onFailure||null}]);},
        post:function(url,param,onSuccess){this.send(url,param,onSuccess,"post");},
        def:function(proc,param,onSuccess){  this.post("/game/rpc/"+proc,param,onSuccess);}
    });
//--------------------------------------------------//
var Canvas = Class.create({
    _canvas:null,
    _ctx:null,
    _w:0,
    _h:0,
    _resize:function(e){Log("res");},
    _start:function()
    {
        this._canvas = $(this._canvas);
        this._canvas.setStyle({"posotion":"absolute","top":"10px","left":"10px"});
        this._ctx =  this._canvas.getContext('2d');
        if(this._ctx)
        {
            this._resize();
            _Scene.start();
            _Input.start();
        }
        return;
    },
    original : function (method, args, returnResult) {
        if(typeof this._ctx == "undefined")return;
        try {
            var result = this._ctx[method].apply(this._ctx, args || []);
            if (returnResult) return result;
        } catch (e) {
            
            _Scene.stop();
            Log('Error in context.original(', method,',', (args || []), ')',e);
            throw e;
        }
        return this;
    },
    _resize:function()
    {
         this._w = document.viewport.getWidth();
        this._h = document.viewport.getHeight();
        this._canvas.setAttribute("width",this._w+"px");
        this._canvas.setAttribute("height",this._h+"px");
        _Scene.draw(true);
        return;
    },
    begin:function(){this.original("beginPath");},
    end:function(){this.original("closePath");},
    stroke:function(){this.original("stroke");},
    fill:function(){this.original("fill");},

    strokeStyle :function(style){this._ctx.strokeStyle = style;},
    fillStyle :function(style){this._ctx.fillStyle = style;},
    moveTo:function(x,y){this.original("moveTo",[x,y]);},
    lineTo:function(x,y){this.original("lineTo",[x,y]);},
    initialize:function(c)
    {
        this._canvas = c;
        Event.observe(window, 'load', (this._start.bind(this)));
        Event.observe(window, 'resize', (this._resize.bind(this)));
        return;
    },
    clear:function(){this.original("clearRect",[0, 0,  this._w, this._h]);}
});
//--------------------------------------------------//
var Scene = Class.create({
    _index:0,
    _paths:new Hash(),
    _fps :45,
    _iterdraw:null,
    start:function()
    {
        this._iterdraw = new PeriodicalExecuter((this.draw.bind(this)),1/this._fps);
        return;
    },
    stop:function(){
        Log("stop");
        this._iterdraw.stop();
    },
    draw:function(flag)
    {
        var _t = _Classif.getClassif("draw"),len=_t.length, index = 0,update = flag;
        if(flag != true)
        {


            for (; index <len; ++index){ if((update = this._paths.get(_t[index]).update()))break;}
        }
        if(update)
        {
            _Canvas.clear();
            index=0;
            for (; index < len; ++index){  this._paths.get(_t[index]).draw();};
        }
        return;
    },
    initialize:function(fps)
    {
        this._fps = fps;
        return;
    },
    addPath:function(path)
    {
        var _t  = this._index++;
        this._paths.set(_t,path)
        return _t;
    },
    getPath:function(id){
        return this._paths.get(id);
    }
});

//--------------------------------------------------//

var Input = Class.create({
    _incanva:true,
    _last_pos:new Point(0,0),
    _click:function(e){
        var p = new Point(e.clientX, e.clientY);
        _Classif.getClassif("click").each(function(item){
            if(_Scene.getPath(item).content(p)){
                
                _Scene.getPath(item).fireEvent("click",p);
            }
        });
    },
    _mouseup:function(e){
         var p = new Point(e.clientX, e.clientY);
        _Classif.getClassif("click").each(function(item){
           // if(_Scene.getPath(item).content(p)){
                _Scene.getPath(item).fireEvent("mouseup",p);
            ///}
        });
    },
     _mousedown:function(e){
        var p = new Point(e.clientX, e.clientY);
        _Classif.getClassif("click").each(function(item){
            if(_Scene.getPath(item).content(p)){

                _Scene.getPath(item).fireEvent("mousedown",p);
            }
        });

    },
    _mouseover:function(e){
        this._incanva = true;
    },
     _mousemove:function(e){

         var p = new Point(e.clientX, e.clientY);

        _Classif.getClassif("move").each(function(item){
           _Scene.getPath(item).fireEvent("mousemove",[p,this._last_pos]);
        }.bind(this));
         this._last_pos = new Point(p);
    },
    _mouseout:function(e){
        this._mouseup(e);
        this._incanva = false;
    },
    _keydown:function(e){

    },
    _keyup:function(e){

    },
    _keypress:function(e){

    },
    start:function(){
        Event.observe(document.body , 'click',      this._click.bind(this));
        Event.observe(document.body , 'mouseup',    this._mouseup.bind(this));
        Event.observe(document.body , 'mousedown',  this._mousedown.bind(this));
        Event.observe(document.body , 'mouseover',  this._mouseover.bind(this));
        Event.observe(document.body , 'mousemove',  this._mousemove.bind(this));
        Event.observe(document.body , 'mouseout',   this._mouseout.bind(this));
        Event.observe(document.body , 'keydown',    this._keydown.bind(this));
        Event.observe(document.body , 'keyup',      this._keyup.bind(this));
        Event.observe(document.body , 'keypress',   this._keypress.bind(this));
    }
});
//--------------------------------------------------//






(function(){
    //--------------------------------------------------//
    var _Ajax       = this._Ajax = new AjaxQueue();
    var _Canvas     = this._Canvas = new Canvas("myCanvas2");
    var _Scene      = this._Scene = new Scene(30);
    var _Classif    = this._Classif = new  Classificator();
    var _Input      = this._Input = new Input();
})();




/*

new Rectangle([10,10],[20,20]).setDraw().setClick().setStroke("#00000");
new Rectangle([10,31],[20,20]).setDraw().setStroke("#00000");
new Rectangle([10,52],[20,20]).setDraw().setStroke("#00000").addEvent("draw",function(){
    this.translate([1,0]);
});*/
/*
var p1 = new Path(new Point(10,10),new Point(200,10),new Point(200,200)).setDraw().setMove().setClick().setFill("#000");
p1.addEvent("mousedown",function(item){this._drug = true;});
p1.addEvent("mouseup",function(item){this._drug = false;});
p1.addEvent("mousemove",function(o,p){
    if(this._drug)
    {

        this.translate(p[1].sub(p[0]).mul(-1));
    }
});

var p2 = new Path(new Point(10,10),new Point(200,200),new Point(10,200)).setDraw().setMove().setClick().setFill("#000");
p1.addEvent("mousedown",function(item){this._drug = true;});
p1.addEvent("mouseup",function(item){this._drug = false;});
p1.addEvent("mousemove",function(o,p){
    if(this._drug)
    {

        this.translate(p[1].sub(p[0]).mul(-1));
    }
});*/