/********************************************/
var $P = function(x,y,scale){return new Point(x,y,scale);};
var $S = function(x,y){return new Size(x,y,false);};
/********************************************/
var Point = Class.create({
    _CheckArg:function()
    {
        var arg = $A(arguments).flatten().compact(),x,y,len=arg.length,p;
        if(len>0){
            p = arg[0];
            if(!Object.isUndefined(p) )
            {
                if(p instanceof Point || p instanceof Size)
                {
                    return [p.x,p.y];
                }
                arg.push(p);
                return [1*arg[0],1*arg[1]];
            }
        }
        return false;
    },
    _Set:function()
    {
        this.fireEvent("change",this);
        return this;
    },
    _scale_to_screen:function(p)
    {
        this.x *= p[0];
        this.y *= p[1];
    },
    //-----------------------
    initialize:function(x,y,scale)
    {

        this.x = 0;
        this.y = 0;
        if(scale != false)Event.addEvent("resizeScreen",this._scale_to_screen.bind(this));
        ///////////////////////////
        var point = this._CheckArg(x,y);
        if(point){

               this.x = point[0];
                this.y = point[1];

          
        }
        
    },
    clone:function()
    {
        return new Point(this.x,this.y);
    },
    len:function(point)
    {
        var x=0,y=0;

        if(point)
        {
            x = Math.pow(this.x-point.x,2);
            y = Math.pow(this.y-point.y,2);

        }else{
            x = this.x*this.x;
            y = this.y*this.y;
        }

        return Math.sqrt(x+y);
    },
    //-----------------------
    onChange:function(fn)
    {

        this.addEvent("change",fn);
        return this;
    },

    //-----------------------
    set:function(x,y)
    {
         var point = this._CheckArg(x,y);
        if(point)
        {
            this.x  = point[0];
            this.y  = point[1];
            this._Set();
        }
    },
    sum:function(x,y)
    {
        var point = this._CheckArg(x,y);
        if(point)
        {
            this.x += point[0];
            this.y += point[1];
            this._Set();
        }
        return this;
    },
    sub:function(x,y)
    {
        var point = this._CheckArg(x,y);
        if(point)
        {
            this.x -= point[0];
            this.y -= point[1];
            this._Set();
        }
        return this;
    },
    div:function(x,y)
    {
        var point = this._CheckArg(x,y);
        if(point)
        {
            this.x /= point[0];
            this.y /= point[1];
            this._Set();
        }
        return this;
    },
    mul:function(x,y)
    {
        var point = this._CheckArg(x,y);
        if(point)
        {
            this.x *= point[0];
            this.y *= point[1];
            this._Set();
        }
        return this;
    },
     neg:function()
    {
        return this.clone().mul(-1);
    },
     //-----------------------
    equal:function(x,y)
    {
        var point = this._CheckArg(x,y);
        if(point)
        {
           return (this.x == point[0] && this.y == point[1]);
        }
        return false;
    },
    isMax:function(point)
    {
        if(point)
        {
            
           if(this.len() < point.len())
            {
                return false;
            }
        }
        return true;
    },
    isMin:function(point)
    {

        if(point)
        {
              
            if(this.len() > point.len())
            {
                return false;
            }
        }
        return true;
    },
    //-----------------------
    toString:function()
    {
        return "{x:"+this.x+",y:"+this.y+"}";
    }
});
/********************************************/
var Size = Class.create(Point,{
    initialize:function($super,x,y,scale)
    {
        
        $super(x,y,scale);
    }
});
/********************************************/