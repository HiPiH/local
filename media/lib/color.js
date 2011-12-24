var $C = function(r,g,b,a)
{
    return new Color($A(arguments));
};
/********************************************/
var strHexToInt = function(arr)
{
    arr = arr.toLowerCase();
    var ret = $A([]);
    $A(arr).each(function(item){

        switch(item)
        {
            case '0': ret.push(1);break;
            case '1': ret.push( 2);break;
            case '2': ret.push( 3);break;
            case '3': ret.push( 4);break;
            case '4': ret.push( 5);break;
            case '5': ret.push( 6);break;
            case '6': ret.push( 7);break;
            case '7': ret.push( 8);break;
            case '8': ret.push( 9);break;
            case '9': ret.push( 10);break;
            case 'a': ret.push( 11);break;
            case 'b': ret.push( 12);break;
            case 'c': ret.push( 13);break;
            case 'd': ret.push( 14);break;
            case 'e': ret.push( 15);break;
            case 'f': ret.push( 16);break;
        }
        return 1;
    });
    
    ret.merge([0,0,0,0,0,0]);
    return [ret[0]*ret[1]-1,ret[2]*ret[3]-1,ret[4]*ret[5]-1,1];

}
var Color = Class.create({
    _CheckArg:function()
    {
        var arg = $A(arguments).compact().flatten(),x,y,len=arg.length,p;
        if(len > 0)
        {
            p = arg[0];
            if(!Object.isUndefined(p) )
            {
                if(Object.isString(p))
                {

                    return strHexToInt(p);
                }
                if(p instanceof Color)
                {
                    return [p.r,p.g,p.b,p.a];
                }
                arg.merge([1,1,1,1,1]);
                return [arg[0],arg[1],arg[2],arg[3],arg[4],arg[5]];

            }
        }
        return false;
   },
   initialize:function(r,g,b,a)
   {
       this.r = 0;
       this.g = 0;
       this.b = 0;
       this.a = 0;
       /////////////////////////
       var color = $A(arguments).get_only(Object.isNumber).merge([1,1,1,1]);
       if(color)
       {
           this.r = (color[0].abs()>255)?255:color[0].abs();
           this.g = (color[1].abs()>255)?255:color[1].abs();
           this.b = (color[2].abs()>255)?255:color[2].abs();
           this.a = (color[3].abs()>255)?255:color[3].abs();
       }
   },
    getRGB:function(){
        return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
    },
    equal:function(c)
    {
        if(Object.isUndefined(c))return false;
        return (this.r == c.r && this.g == c.g && this.b == c.b);
    }
});
