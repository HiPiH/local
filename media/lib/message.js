/**
 * Created by PyCharm.
 * User: Aleksey.Novgorodov
 * Date: 28.10.11
 * Time: 12:18
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var Message = Class.create({
        error:function(text)
        {
            alert(text);
        }
    }) ;

    var _Message = this._Message = new Message();
})()