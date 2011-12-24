__author__ = 'Aleksey.Novgorodov'
var MaxInt = 99999;
/////////////////////////////////////////////////
var Param = Class.create({
    initialize:function()
    {
        this._param = $H();
    },
    set:function(key,value)
    {
        if(Object.isUndefined(value))
        {
             this._param.update(key);
        }
        else
        {
            this._param.set(key, value);
        }
        return this;
    },
    get:function(key)
    {
      return this._param.get(key);
    },
    del:function(key)
    {
        this._param.unset(key);
        return this;
    }
});
 /////////////////////////////////////////////////
var Painter = Class.create(Param,{
    initialize:function($super,extend)
    {
         $super();
         this.ext(extend);
         this.set({
            "fill":false,
            "stroke":false,
            "update":true,
             "name":_Scene.getName()
        });
         _Scene.add(this);
    },
    destroy:function()
    {
        _Scene.del(this);

    },
    getName:function(){
        return this.get("name");
    },
    setFill:function(color)
    {
       this.set("fill",(Object.isColor(color)?color: new Color(color)));
       return this;
    },
    setStroke:function(color)
    {
        this.set("stroke",(Object.isColor(color)?color: new Color(color)));
       return this;
    },
    FillStroke:function()
    {
        var stroke = this.get("stroke"),fill= this.get("fill");
        if(stroke){_Canvas.strokeStyle(stroke);_Canvas.stroke();}
        if(fill){_Canvas.fillStyle(fill);_Canvas.fill();}
        return this;
    },
    ext:function(proto)
    {
        $A(arguments).flatten().each(function(item){

            
            Object.extend(this,item);
            this.setEvent();
            
            return;
        }.bind(this));
        return this;
    },
    Draw:function(){},
    setEvent:function(){},
    moveUp:function()
    {
        _Scene.moveUp(this);
    }

});
/////////////////////////////////////////////////
var Path = Class.create(Painter,{
    _point_change:function(point)
    {
        var tpoint = point.clone().sum($P(MaxInt,MaxInt));
        if(!this._area[2].isMin(tpoint))
        {
            this._area[0] = point;
            this._area[2] = tpoint;
        }
        if(!this._area[3].isMax(tpoint))
        {
            this._area[1] = point;
            this._area[3] = tpoint;
        }
        return;
    },
    _set_up_points_arr:function(arr)
    {
         arr.each(function(item){
             item.onChange(this._point_change.bind(this));
         }.bind(this));
        return arr;
    },
    _set_up_guard:function()
    {
        this._area   = $A([$P(MaxInt*2,MaxInt*2),$P(0,0),$P(MaxInt*2,MaxInt*2),$P(0,0)]);
        this._points.each(function(item){
            this._point_change(item);
         }.bind(this));
    },
    initialize:function($super,extend)
    {
        this._points = $A([]);
        $super(extend);
        //////////////////////


        this.set({"close":true});
        //////////////////////
        this.addPoints($A(arguments).flatten());

    },
    getGuard:function()
    {
        return this._area ;
    },
    addPoints:function(points)
    {
       this._points.merge(this._set_up_points_arr($A(arguments).get_only(Object.isPoint)));
       this._set_up_guard();
       return this;
    },
    insertPoints:function(index,points)
    {
        this._points.insert(index,this._set_up_points_arr($A(arguments).get_only(Object.isPoint)));
        this._set_up_guard();
        return this;
    },
    deletePoints:function(points_or_indexs)
    {
        var indexs = $A(arguments).get_only(Object.isNumber);
        $A(arguments).get_only(Object.isPoint).each(function(point){
            this._points.each(function(item,i){
                if(item.equal(point)){
                    indexs.push(i);
                }
            }.bind(this));
        }.bind(this));
        this._points.del(indexs);
        this._set_up_guard();
        return this;
    },
    DrawLine:function(check)
    {
        _Canvas.begin();
        _Canvas.moveTo(this._points[0]);
        this._points.each(_Canvas.lineTo.bind(_Canvas));
        if(this.get("close") == true||check)
        _Canvas.end();

    },
    Draw:function()
    {
        if(this._points.length > 0)
        {
            _Canvas.save();
             this.DrawLine();
             this.FillStroke();
             this.set("update",false);
            _Canvas.restore();
        }
        return this;
    },
    hasPoint:function(point)
    {

        var ret = false;
        _Canvas.save();
        this.DrawLine(true);
        ret = _Canvas.isPointInPath(point);
        _Canvas.restore();
        return ret;
    },
    hasPath:function(path,full)
    {
        var g1 = this.getGuard(),g2 = path.getGuard(), padd= -5;
        if(full == true)
        {
            if(g1[0].x.between(g2[0].x-1,g2[1].x,padd) && g1[1].x.between(g2[0].x,g2[1].x,padd) && g1[0].y.between(g2[0].y,g2[1].y,padd) && g1[1].y.between(g2[0].y,g2[1].y,padd))
            {
                    return 1;
            }
            if (g2[0].x.between(g1[0].x,g1[1].x,padd) &&  g2[1].x.between(g1[0].x,g1[1].x,padd) && g2[0].y.between(g1[0].y,g1[1].y,padd) && g2[1].y.between(g1[0].y,g1[1].y,padd))
            {
                   return -1;
            }
        }else{
            if  (g1[0].x.between(g2[0].x,g2[1].x,padd) || g2[0].x.between(g1[0].x,g1[1].x,padd) || g1[1].x.between(g2[0].x,g2[1].x,padd) || g2[1].x.between(g1[0].x,g1[1].x,padd))
            {
               if  (g1[0].y.between(g2[0].y,g2[1].y,padd) ||g2[0].y.between(g1[0].y,g1[1].y,padd) ||g1[1].y.between(g2[0].y,g2[1].y,padd) ||g2[1].y.between(g1[0].y,g1[1].y,padd))
               {

                        return true;
                   
               }
            }
        }
        return false;
    },
    translate:function(delta)
    {
        this._points.each(function(item){
            item.sum(delta);
        });
        this.set("update",true);
    }
});
/////////////////////////////////////////////////
var Rectage = Class.create(Path,{
    initialize:function($super,extend)
    {
        var points = $A(arguments).get_only(Object.isPoint),sizes = $A(arguments).get_only(Object.isSize);
        if(points.length == 0) points.push($P(0,0));
        if(sizes.length == 0) sizes.push($S(0,0));
        this._size = sizes[0];
        $super(extend);
        this.setPointsFromSize(points[0]);

    },
    setPointsFromSize:function(point)
    {
       this._points.clear();
       this.addPoints(
            point.clone(),
            point.clone().sum(this._size.x,0),
            point.clone().sum(this._size.x,this._size.y),
            point.clone().sum(this._size)
       );
        this.set("update",true);
    },
    getSize:function()
    {
        return this._size;
    },
    reSize:function(size)
    {
        var numbers = $A(arguments).get_only(Object.isNumber),sizes = $A(arguments).get_only(Object.isSize);
        if(sizes.length == 0)
        {
            this._size.set(numbers[0],numbers[1]);
        }else{
            this._size = sizes[0].clone();
        }
        this.setPointsFromSize(this._points[0].clone());
        this.set("update",true);
    },
    DrawLine:function()
    {
        _Canvas.begin();
        _Canvas.rect(this._points[0],this._size);
        _Canvas.end();
    }
});
/////////////////////////////////////////////////
var Circle = Class.create(Path,{
    initialize:function($super,extend,center,radius)
    {
        var points = $A(arguments).get_only(Object.isPoint),sizes = $A(arguments).get_only(Object.isNumber);
        if(points.length == 0) points.push($P(0,0));
        $super(extend);
        this.set("center",points[0]);
       
        this.set("radius",sizes[0]);
        this.set("start_angel",0);
        this.set("stop_angel",Math.PI*2);   
        this.set("clock",true);

        this.setPointsFromSize(points[0]);

    },
    setPointsFromSize:function()
    {

       var radius = this.get("radius"),npoint = this.get("center");
       this._points.clear();
       this.addPoints(
            npoint.clone().sum($P(-radius,-radius)),
            npoint.clone().sum($P(radius,-radius)),
            npoint.clone().sum($P(radius,radius)),
            npoint.clone().sum($P(-radius,radius)),
            npoint
       );
        this.set("update",true);
    },
    getSize:function()
    {
        return this._size;
    },
    reSize:function(radius)
    {
        this.set("radius",radius);
        this.setPointsFromSize();
        this.set("update",true);
    },
    DrawLine:function()
    {
        _Canvas.begin();
        _Canvas.arc(this._points[4],this.get("radius"));
        _Canvas.end();
    }
});
/////////////////////////////////////////////////
var CImage = Class.create(Rectage,{
    _loaded:function(){
        this._load = true;
        _Scene._Draw(true);
    },
    initialize:function($super,extend)
    {
        var points =
            $A(arguments).get_only(Object.isPoint),
            sizes = $A(arguments).get_only(Object.isSize),
            images = $A(arguments).get_only(Object.isString);
        this.image = new Image();
        this._load = false;
        if(points.length == 0) points.push($P(0,0));
        if(sizes.length == 0) sizes.push($S(0,0));
        if(images.length == 0) images.push("");
        this.image.onload = this._loaded.bind(this);
        this.image.src = images[0].split(":")[0];
        this.shift = $P(images[0].split(":")[1],images[0].split(":")[2],false);
        this.size = $S(images[0].split(":")[3],images[0].split(":")[4] );
     
        $super(extend,points[0],sizes[0]);

    },
    DrawLine:function(check)
    {
        _Canvas.begin();
        _Canvas.rect(this._points[0],this._size);
        if(this._load == true&& !check)
        {

            _Canvas.drawImage(this.image,this._points[0],this._size,this.shift,this.size);
        }
        _Canvas.end();
    }

});
