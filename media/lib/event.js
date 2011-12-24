(function(){
    var EventPoint = Class.create(Point,{
        initialize:function(e)
        {
            this.left = Event.isLeftClick(e);
            this.right = Event.isRightClick(e);
            this.midle = Event.isMiddleClick(e);
            this.x = Event.pointerX(e)-_Canvas._w;
            this.y = Event.pointerY(e)-_Canvas._h-$("toolbar").getHeight();
            _Event.setLastPos(this);
        },
        delta:function()
        {
            return this.clone().sub(_Event._lasp_pos);
        }
    });
    var OEvent = Class.create({
        _click:function(e)    {  this.fireEvent("click",     new EventPoint(e)); },
        _mouseup:function(e)  {  this.fireEvent("mouseup",   new EventPoint(e)); },
        _mousedown:function(e){  this.fireEvent("mousedown", new EventPoint(e)); },
        _mouseover:function(e){  this.fireEvent("mouseover", new EventPoint(e)); },
        _mousemove:function(e){  this.fireEvent("mousemove", new EventPoint(e)); },
        _mouseout:function(e) {  this.fireEvent("mouseout",  new EventPoint(e)); },
        _keydown:function(e)  {  this.fireEvent("keydown",   new EventPoint(e)); },
        _keyup:function(e)    {  this.fireEvent("keyup",     new EventPoint(e)); },
        _keypress:function(e) {  this.fireEvent("keypress",  new EventPoint(e)); },
        setLastPos:function(p)
        {
           this._lasp_pos = this._cur_pos ;
           this._cur_pos = p;
        },
        initialize:function(){
            this._lasp_pos = false;
            this._cur_pos = false;

            Event.observe(window, 'load', function(){
                Event.observe(document.body , 'click',      this._click.bind(this));
                Event.observe(document.body , 'mouseup',    this._mouseup.bind(this));
                Event.observe(document.body , 'mousedown',  this._mousedown.bind(this));
                Event.observe(document.body , 'mouseover',  this._mouseover.bind(this));
                Event.observe(document.body , 'mousemove',  this._mousemove.bind(this));
                Event.observe(document.body , 'mouseout',   this._mouseout.bind(this));
                Event.observe(document.body , 'keydown',    this._keydown.bind(this));
                Event.observe(document.body , 'keyup',      this._keyup.bind(this));
                Event.observe(document.body , 'keypress',   this._keypress.bind(this));
                return;
            }.bind(this));

        },
        Stop:function()
        {
               Event.stopEvent();
        }
    });
    var _Event = this._Event = new OEvent();
})();
/////////////////////////////////////////////////
var Selectable =Object.extend({
    _selectable_mouse_move:function(p)
    {

        var has = this.hasPoint(p);
        if(has)
        {

            if(this.get("mousehover")==false)
            {
                 this.fireEvent("mousehover");
                 this.set("mousehover",true);
            }
            
        }else{

            if(this.get("mousehover")==true)
            {
                this.fireEvent("mouseout");
                this.set("mousehover",false);
            }
        }
        return;
    },
    _selectable_mouse_in:function(p){
        var stroke = this.get("stroke");
        if(this.get("view_select") == true)
        {

            this.set("stroke",this.get("seleced_strocke"));
            this.set("seleced_strocke",stroke);
            this.set("update",true);
        }
        return;
    },
    _selectable_mouse_out:function(p){
        var stroke = this.get("seleced_strocke");
        if(this.get("view_select") == true)
        {
           
            this.set("seleced_strocke",this.get("stroke"));
            this.set("stroke",stroke);
            this.set("update",true);
        }
        return;
    },
    setEvent:function()
    {
         this.set({
             "view_select":true,
             "seleced_strocke":$C(255,0,0),
             "mousehover":false
         });
         this.addEvent("mousehover",this._selectable_mouse_in.bind(this));
         this.addEvent("mouseout",this._selectable_mouse_out.bind(this));
         _Event.addEvent("mousemove",this._selectable_mouse_move.bind(this));
         
    }
});
/////////////////////////////////////////////////

var Clickable = Object.extend({
        _clicable_down:function(p)
        {
            
            if( this.get("mousehover") == true)
            {
                _Scene.moveUp(this);
                this.set("mousedown",p);
            }
        },
        _clicable_up:function(p)
        {
            if( this.get("mousedown") != false)
            {
               this.fireEvent("mouseup",p);
            }
            this.set("mousedown",false);
        },
        _clicable_click:function(p)
        {
            if( this.get("mousehover") == true)
            {
               this.fireEvent("click",p);
            }
        },
        setEvent:function()
        {
            this.set("mousedown",false);
            this.ext(Selectable);
            this.addEvent("mousedown",this._clicable_down.bind(this));
            _Event.addEvent("mouseup",this._clicable_up.bind(this));
            _Event.addEvent("mouseout",this._clicable_up.bind(this));
            _Event.addEvent("click",this._clicable_click.bind(this));
            
        }
    });
/////////////////////////////////////////////////
var Drugable = Object.extend({
        _drugable_mouse_move:function(p)
        {
            if(p.left &&  this.get("mousedown") != false )
            {
                this.fireEvent("move",p);
                this.translate(p.delta());
                p = _Canvas.inPole(this.getGuard());
                this.translate(p);
            }

        },
        setEvent:function()
        {

            this.ext(Clickable);
            _Event.addEvent("mousemove",this._drugable_mouse_move.bind(this));
        }
    });
/////////////////////////////////////////////////
var Collisionable = Object.extend({

        _collisionable_mouse_move:function(p)
        {
           var obj = _Scene.hasPath(this);
           
           if(obj)
           {

               this.fireEvent("collision",obj,p);
               if(this._coolision_obj.indexOf(obj.getName()) == -1)
               {
                   this.fireEvent("collisionin",obj,p);
                   obj.fireEvent("collisionin",this,p);
                   this._coolision_obj.push(obj.getName());
               }

           }else{
                 this._coolision_obj.clear();
           }
        },
        setEvent:function()
        {
            this.ext(Drugable);
            this._coolision_obj = $A([]);
            this.addEvent("move",this._collisionable_mouse_move.bind(this));
        }
    });

/////////////////////////////////////////////////
var Dropable = Object.extend({
        _dropable_mouse_up:function(p)
        {
            this._coolision_obj.each(function(name){
                var obj = _Scene.get(name);
                this.fireEvent("drop",obj);
                obj.fireEvent("drop",this)
            }.bind(this));
        },
        setEvent:function()
        {
            this.ext(Collisionable);
            this.addEvent("mouseup",this._dropable_mouse_up.bind(this));
        }
    });