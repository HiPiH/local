
   var Interface = Group.extend({
       onFrame:function(){}
   });

   var size = 190;
   var p = new Point(200,200);


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
            temp.strokeWidth = 0.51;
            g3.addChild(temp);
        }
   }
   g3.translate([86,86]);
   g3.copyTo(g4);
   g4.translate([400,0]);

   var path3 = new Path.Circle(p, size);

   path3.strokeColor = '#559955';
   path3.fillColor = new RGBColor(0.5,1,0.5,0.5);
   var path = new Path.Line(p, p+[ size,0 ]);
   path.strokeColor = '#559955';
   
   var path4 = new Path.Circle(p, 5);
   path4.fillColor = '#559955';

   var g = new Interface(path3,path,path4);
   g.onFrame =  function(event)
               {
                    this.children[1].rotate(-1,this.children[1].segments[0].point);
                    //this.children[2].rotate(-1,this.children[2].segments[0].point);
               };
   var secendLyer = new Layer();
   var g2 = new Interface();
   g.copyTo(g2);
   g2.onFrame =  function(event)
               {
                    this.children[0].children[1].rotate(-1,this.children[0].children[1].segments[0].point);
                    //this.children[0].children[2].rotate(-1,this.children[0].children[2].segments[0].point);
                   
               };
   g2.translate([400,0]);


function onResize(event)
{
    /*path.segment[1].point = view.center;
    path3.position = view.center;*/
}
function onFrame(event)
{
   g.onFrame(event);
     g2.onFrame(event);
    //secondLayer.children[1].rotate(-1,secondLayer.children[1].segments[0].point);
    //secondLayer.children[2].rotate(-1,secondLayer.children[2].segments[0].point);


}

function onMouseDown(event) {
   g5.onMouseDown(event);
}
function onMouseUp(event) {
   g5.onMouseUp(event);
}
function onMouseDrag(event) {
g5.onMouseDrag(event);
}