var XButton = Class.create(Rectage,{
    initialize:function($super,extend)
    {
        var points = $A(arguments).get_only(Object.isPoint),sizes = $A(arguments).get_only(Object.isSize),
            text =$A(arguments).get_only(Object.isString) ;
         $super(extend,points[0],sizes[0]);
        

    }
});