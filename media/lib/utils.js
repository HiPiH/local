/********************************************/

var canvas_support = {
	canvas_compatible : false,
	check_canvas : function() {
		try {
			this.canvas_compatible = !!(document.createElement('canvas').getContext('2d')); // S60
			} catch(e) {
			this.canvas_compatible = !!(document.createElement('canvas').getContext); // IE
		}
		return this.canvas_compatible;
	}
};

(function()
{
    var LogPrototype = Class.create({
        _console:null,
        _log:function()
        {
            if(arguments.length>0)
            {
                alert(arguments[0]);
            }
        },
        _log2:function()
        {
            if(arguments.length>0)
            {
                console.log(arguments.length==1?arguments[0]:arguments);
            }
        },
        initialize:function()
        {
            if(typeof console !== "undefined")
            {
                this._console = {log:this._log2};
            }else{
                this._console = {log:this._log};
            }
        },
        write:function()
        {
            this._console.log(arguments);
        }
    });
    var _LogObject = new LogPrototype();
    var Log = this.Log = _LogObject.write.bind(_LogObject);
    
})();
/********************************************/

Object.extend(Object.prototype,{
    _event_queueu:null,
     addEvent:function (src,fn)
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
    fireEvent:function(src,p1,p2,p3,p4,p5,p6)
    {
        var _t;
        if(this._event_queueu != null)
        {
            _t = this._event_queueu.get(src);
            if(_t){
                _t.each((function(fn,i){
                    if(fn != null)
                    {
                        if(fn.apply( null,[p1,p2,p3,p4,p5,p6]) === false)
                        {
                            _t.del(i);
                        }
                    }
                }));
                _t = _t.compact();
            }
        }
        return this;
    },
    stopEvent:function()
    {
        this._event_queueu = null;

    },
    isPoint:function(obj)
    {
        return obj instanceof Point;
    },
    isSize:function(obj)
    {
        return obj instanceof Size;
    },
    isColor:function(obj)
    {
        return obj instanceof Color;
    }
});

/********************************************/

Object.extend(Number.prototype,
{
    znak:function()
    {
        return (this>0?1:(this<0?-1:0));
    },
    between:function(from,to,padding)
    {
        padding = padding||0;
        return (this-padding >= from && this+padding <= to);
    },
    degree: function () {
	    return this * Math.PI / 180;
    }
});
/********************************************/

/********************************************/
Object.extend( Array.prototype,
{
    _index_val:function(index)
    {
        var len = this.length-1;
        index = Object.isNumber(index)?index:0;
        if(index.between(-len,len))
        {
            if(index >= 0)
            {
                return index;
            }
            return len+index;
        }
        return -1;
    },
    merge:function(arr)
    {
        $A(arr).each(function(item){
            this.push(item);
        }.bind(this));
        return this;
    },
    each_cond:function(iterator,cond,revers)
    {
        var flag = false,i = 0,length=this.length;
        if(revers)
        {
            i = length-1;
            for ( ; i >= 0 ; i--)
            {
                    if(iterator( this[i], i, this) == cond)
                    {
                        flag = true;
                        break;

                    }
            }
        }else{
            for ( ; i < length; i++)
            {
                    if(iterator( this[i], i, this) == cond)
                    {
                        flag = true;
                        break;

                    }
            }
        }
        return flag;
    },
    set:function(index,value)
    {
        index = this._index_val(index);
        if(index >=0)
        {
            this[index] = value;
        }
        return this;
    },
    get:function(index)
    {
        index = this._index_val(index);
        if(index>=0)
        {
            return this[index];
        }
        return false;
    },
    getTo:function(fn)
    {
        var obj = false;
        this.each_cond(function(item){
              if(fn(item))
              {
                  obj = item;
                  return true;
              }
            return false
        },true);
        return obj;
    },
    del:function(i)
    {
        var len = this.length;
        if(Object.isNumber(i))
        {
            if(i.between(0,len-1));
            {
                this.splice(i,1);
            }
        }else{
           i.sort(function sortNumber(a,b){return b - a;}).uniq().each(function(item)
           {
                this.del(item);
           }.bind(this));
        }
        return this;
    },
    insert:function(i,arr)
    {
        var a1=this.splice(i,this.length-i);
        if(Object.isArray(arr))
        {
            this.merge(arr);

        }else{
            this.push(arr)
        }
        this.merge(a1);
        return this;
    },
    get_only:function(proto)
    {
        var ret = this.flatten().compact(),protos = $A(arguments).flatten().compact();
        protos.each(function(p){
            ret.each(function(item,i){
               if(Object.isFunction(p))
               {

                    if(p(item))return;
               }
               ret[i] = null;
            });
        });
        return ret.compact();
    },
    clone:function()
    {
        return $A(this);
    },
    range:function(i,count)
    {
        var ret = $A([]);
        if(count){count += i;}else{count = this.length;}
        $R(i,count).each(function(i){
               ret.push(this[i]);
            }.bind(this));
        return ret;
    }
});
/********************************************/
function preventSelection(element){
  var preventSelection = false;

  function addHandler(element, event, handler){
    if (element.attachEvent)
      element.attachEvent('on' + event, handler);
    else
      if (element.addEventListener)
        element.addEventListener(event, handler, false);
  }
  function removeSelection(){
    if (window.getSelection) { window.getSelection().removeAllRanges(); }
    else if (document.selection && document.selection.clear)
      document.selection.clear();
  }
  function killCtrlA(event){
    var event = event || window.event;
    var sender = event.target || event.srcElement;

    if (sender.tagName.match(/INPUT|TEXTAREA/i))
      return;

    var key = event.keyCode || event.which;
    if (event.ctrlKey && key == 'A'.charCodeAt(0))  // 'A'.charCodeAt(0) можно заменить на 65
    {
      removeSelection();

      if (event.preventDefault)
        event.preventDefault();
      else
        event.returnValue = false;
    }
  }

  // не даем выделять текст мышкой
  addHandler(element, 'mousemove', function(){
    if(preventSelection)
      removeSelection();
  });
  addHandler(element, 'mousedown', function(event){
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
  });

  // борем dblclick
  // если вешать функцию не на событие dblclick, можно избежать
  // временное выделение текста в некоторых браузерах
  addHandler(element, 'mouseup', function(){
    if (preventSelection)
      removeSelection();
    preventSelection = false;
  });

  // борем ctrl+A
  // скорей всего это и не надо, к тому же есть подозрение
  // что в случае все же такой необходимости функцию нужно
  // вешать один раз и на document, а не на элемент
  addHandler(element, 'keydown', killCtrlA);
  addHandler(element, 'keyup', killCtrlA);
};

window.requestAnimFrame = (function(){
     return  window.requestAnimationFrame       ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame    ||
             window.oRequestAnimationFrame      ||
             window.msRequestAnimationFrame     ||
             function(/* function */ callback, /* DOMElement */ element){
               window.setTimeout(callback, 1000 / 60);
             };
   })();


