(function(canva,fps){

    var Scene = Class.create({

        _get_index_obj:function(obj)
        {
            return this._objects.indexOf(obj);
        },
        _Draw:function(fors)
        {
            var fl = this._objects.each_cond(function(item){return item.get("update");},true);
            if(fl||fors)
            {
                _Canvas.clear();
                this._objects.each_cond(function(item){item.Draw();return;},true,true);
            }
            return true;
        },
        hasPath:function(obj,full)
        {
           var t  = this._get_index_obj(obj),ret = false;
           this._objects.each_cond(function(item,i){
               if(i != t)
               {
                  if(item.hasPath(obj,full))
                  {
                      ret = item;
                      return true;
                  }
               }
              return false;
           });
            return ret;
        },
        moveUp:function(obj)
        {
            
            var t  = this._get_index_obj(obj);
            this._objects.del(t);
            this._objects.unshift(obj);
            this._Draw(true);

        },
        mousedown:function(p)
        {
               this._objects.each_cond(function(item){
                    if(item.hasPoint(p) == true)
                    {
                        item.fireEvent("mousedown",p);
                        return true;
                    }
                   return false;
               },true,false);
        },
        initialize:function(fps)
        {
            _Canvas.addEvent("reDraw",this._Draw.bind(this));
            _Canvas.addEvent("start",this.Start.bind(this));
            _Canvas.addEvent("stop",this.Stop.bind(this));
            _Event.addEvent("mousedown",this.mousedown.bind(this));
            this.setFps(fps);
            this._name = 0;
            this._loop = false;
            this._objects = $A([]);
            this._objects_name = $H([]);

        },
        getName:function()
        {
            return this._name++;
        },
        setFps:function(fps)
        {
            this._fps = fps||30;
            if(this._loop)
            {
                this.Stop();
                this.Start();
            }
            return this;
        },
        add:function(obj)
        {
            this._objects.push(obj);
            this._objects_name.set(obj.getName(),obj);
            if(this._loop )this._Draw(true);
            return this;
        },
        del:function(obj)
        {
            this._objects = this._objects.without(obj);
            this._objects_name.unset(obj.getName());
            if(this._loop )this._Draw(true);
            return this;
        },
        get:function(name)
        {
           return  this._objects_name.get(name);
        },
        Draw:function()
        {
            if(this._loop )
            {
                this._Draw();
                window.requestAnimFrame(this.Draw.bind(this));
            }
        },
        Start:function()
        {
            this._loop  = true;
            this.Draw();
            return this;
        },
        Stop:function()
        {
            if(this._loop )
            {
                this._loop = false;
            }
            return this;
        }

    });
    

    var Canvas = Class.create({
        _start:function()
        {
            preventSelection(document);
            this._canvas = $(this._canvas);
            this._canvas.setStyle({"position":"absolute","top":$("toolbar").getHeight(),"left":"1px"});
            if(canvas_support.check_canvas())
            {
                this._ctx =  this._canvas.getContext('2d');
                if(this._ctx)
                {
                    this._resize();
                    this.fireEvent("start");
                }
            }else{
                $('nobrowser').removeClassName('hide');
                 this._ctx = false;
                 _Event.stopEvent();
            }
            return;
        },
        _resize:function()
        {
            var lastx=  this._w, lasty=  this._h;

            this._w = document.viewport.getWidth();
            this._h = document.viewport.getHeight();
            this._canvas.setAttribute("width",this._w+"px");
            this._canvas.setAttribute("height",this._h+"px");
            document.body.style.width = this._w+"px";
            document.body.style.height = this._h+"px";
            this._w /= 2;
            this._h /= 2;
            Event.fireEvent("resizeScreen",[(lastx == 0?1:this._w/lastx),(lasty == 0?1:this._h/lasty)]);
            this.fireEvent("reDraw",true);

            return;
        },
        initialize:function(cv)
        {
            this.clearColor = new Color("#FFFFFF");
            this._ctx = false;
            this._w = 0;
            this._h = 0;
            this._scale=$P(1,1);
            this._canvas = cv;
            Event.observe(window, 'load', (this._start.bind(this)));
            Event.observe(window, 'resize', (this._resize.bind(this)));
            return;
        },
        inPole:function(g)
        {
                var ret = $P(), x1 = g[0].x.abs(), y1 = g[0].y.abs(), x2 = g[1].x.abs(), y2 = g[1].y.abs();
                if(this._w-2 <= x1){ ret.sum($P( (x1-this._w+2),0)); }
                if(this._w-2 <= x2){ ret.sum($P( (this._w-x2-2),0)); }

                if(this._h-2 <= y1){ ret.sum($P( 0,(y1-this._h+2))); }
                if(this._h-2 <= y2){ ret.sum($P( 0,(this._h-y2-2))); }
                return (ret.x == 0 && ret.y == 0?false:ret);
        },
        original : function (method, args, returnResult) {
            if(Object.isUndefined( this._ctx) || this._ctx  == false)return;
            try {
                var result = this._ctx[method].apply(this._ctx, args || []);
                if (returnResult) return result;
          
            } catch (e) {
               this.fireEvent("stop",true);
                Log('Error in context.original(', method,',', (args || []), ')',e);
                throw e;
            }
            return this;
        },
        //----------------------------------------------
            begin:function(){this.original("beginPath");return this;},
            end:function(){this.original("closePath");return this;},
            save:function(){this.original("save");return this;},
            restore:function(){this.original("restore");return this;},
            stroke:function(){this.original("stroke");return this;},
            fill:function(){this.original("fill");return this;},
            clear:function(){
                this.original("clearRect",[0, 0,  this._w*2, this._h*2]);
                return this;
            },
            rotate:function(g){ this.original("rotate",[g.degree()]); return this;},
            strokeStyle :function(style){
                if(Object.isString(style)){this._ctx.strokeStyle = style;}
                else{this._ctx.strokeStyle = style.getRGB();}
                return this;
            },
                
            scale :function(point){

                this.original("scale",[point.x,point.y]);
                return this;
            },

            fillStyle :function(style){
                if(Object.isString(style)){this._ctx.fillStyle = style;}
                else{this._ctx.fillStyle = style.getRGB();}
                return this;
            },
            moveTo:function(point){

                if(Object.isArray(point))
                {
                    point  = $P(point);
                }
                this.original("moveTo",[point.x+this._w,point.y+this._h]);
                return this;
            },
            lineTo:function(point){
                this.original("lineTo",[point.x+this._w,point.y+this._h]);
                return this;
            },
            arc:function(point,radius,startAngle,endAngle, clockwise){
                if(Object.isArray(point))
                {
                    point  = $P(point);
                }
             
                this.original("arc",[point.x+this._w,point.y+this._h,radius,startAngle||0,endAngle||Math.PI*2,clockwise||true]);
                return this;
            },
            fillRect:function(point,size)
            {


                this.original("fillRect",[point.x+this._w,point.y+this._h,size.x,size.y]);
                return this;
            },
            strokeRect:function(point,size)
            {

                this.original("strokeRect",[point.x+this._w,point.y+this._h,size.x,size.y]);
                return this;
            },
            rect:function(point,size)
            {

                this.original("rect",[point.x+this._w,point.y+this._h,size.x,size.y]);
                return this;
            },

            isPointInPath:function(point)
            {
                return this.original("isPointInPath",[point.x+this._w,point.y+this._h],true);
            },
            drawImage:function(img,point,size,shift,size2)
            {
                shift = shift.clone()||$P(0,0);
                size2 = size2.clone()||$S(0,0);
                if(size2.x==0)size2.x = img.width-shift.x;
                if(size2.y==0)size2.y = img.height-shift.y;

                this.original("drawImage",[img,shift.x,shift.y,size2.x,size2.y,point.x+this._w,point.y+this._h,size.x,size.y]);
                return this; 
            }

    });

     var _Canvas = this._Canvas = new Canvas(canva);
     var _Scene = this._Scene = new Scene(fps);




})("myCanvas2",30);