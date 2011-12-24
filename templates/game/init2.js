/**
 * Created by PyCharm.
 * User: Aleksey.Novgorodov
 * Date: 06.09.11
 * Time: 14:52
 * To change this template use File | Settings | File Templates.
 */
   var  MyPole = Group.extend({});
   var  EnemyPole = Group.extend({});

   var g3 =  new MyPole();
    var g4 =  new EnemyPole();
   for(var x =0;x<10;x++)
   {
        for(var y =0;y<10;y++)
        {
            var temp = new Path.Rectangle(new Point(x*23,y*23), new Size(20,20));
            temp.strokeColor = '#000';
            temp.fillColor = '#FFF';
            temp.strokeWidth = 0.51;
            g3.addChild(temp);
        }
   }
   g3.translate([86,86]);
   g3.copyTo(g4);
   g4.translate([400,0]);



    var Ships = Group.extend({
       dgdrp:null,
       onMouseDown:function(event)
       {
           var t = this;
            this.children.forEach(function(item){
                if(item.hitTest(event.point)!= null)
                {
                    t.dgdrp = item;
                }
            });

       },
       onMouseDrag:function(event)
       {
            if(this.dgdrp != null)
            {
                this.dgdrp.translate(event.delta);
                this.dgdrp.onMove(event);
            }
       },
        onMouseUp:function(event)
       {

            this.dgdrp = null;
       },
       onMouseMove:function(event) {

           
        }
   });
    var g5 = new Ships();

    var temp = new Path.Rectangle(new Point(23,23), new Size(20,60));
    temp.onMove=function(event)
        {
             var t = this;
            g3.children.forEach(function(item){
                if(item.hitTest(t.getPointAt(t.length))!= null)
                {
                   console.log('111');
                }
            });
        };
    temp.strokeColor = '#000';
    temp.fillColor = '#666';
    g5.addChild(temp)

function onMouseDown(event) {
    g5.onMouseDown(event);
}
function onMouseUp(event) {
    g5.onMouseUp(event);
}
function onMouseDrag(event) {
    g5.onMouseDrag(event);
}
function onMouseMove(event) {
    g5.onMouseMove(event);
}