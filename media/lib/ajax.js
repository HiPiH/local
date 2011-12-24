/**
 * Created by PyCharm.
 * User: Aleksey.Novgorodov
 * Date: 28.10.11
 * Time: 10:38
 * To change this template use File | Settings | File Templates.
 */
(function(){
        /*  if(! Object.isFunction(headers[name])) добавить в Prototype.Ajax.Setrequets.header*/
        var A_X = Class.create({
            initialize:function()
            {
                   this.command("init/");
                   this.update = new Ajax.PeriodicalUpdater('get_events', 'get/',{method: 'get', frequency: 2, decay: 2,onSuccess:function(transport){this.response(transport);}.bind(this)});
                   this.update.start();
            },
            command:function(url,callback)
            {
                var req = new Ajax.Request(url, {
                        requestHeaders: {Accept: 'application/json'},
                        onSuccess:function(transport){this.response(transport,callback);}.bind(this)
                    }
                );
            },
            response:function(transport,callback)
            {

                var items = $A(transport.responseText.evalJSON(true));
                if(Object.isUndefined(callback))
                {
                    items.each(function(item)
                    {
                        
                        this[item.class][item.method](item.params);
                    });
                }else{
                    callback(items);
                }
            },
            stop:function()
            {
                this.update.stop();
            }
        });

       //   var _A_X =  this._A_X = new A_X();

})();
