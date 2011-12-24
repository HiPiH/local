var cards =
{
    110:"/media/image/pcards1.png:0:1089:343:498",
    410:"/media/image/pcards1.png:406:1089:343:498",
    210:"/media/image/pcards1.png:812:1089:343:498",
    310:"/media/image/pcards1.png:1211:1089:343:498",
    114:"/media/image/picter.png:2:1:158:230",
    214:"/media/image/picter.png:180:1:158:230",
    1:  "/media/image/picter.png:358:1:158:230",
    111:"/media/image/picter.png:536:1:158:230",
    211:"/media/image/picter.png:714:1:158:230",
    112:"/media/image/picter.png:893:1:158:230",
    212:"/media/image/picter.png:1072:1:158:230",
    113:"/media/image/picter.png:1250:1:158:230",
    213:"/media/image/picter.png:1428:1:158:230",
    414:"/media/image/picter.png:2:262:158:230",
    314:"/media/image/picter.png:180:262:158:230",
    2:  "/media/image/picter.png:358:262:158:230",
    411:"/media/image/picter.png:536:262:158:230",
    311:"/media/image/picter.png:714:262:158:230",
    412:"/media/image/picter.png:893:262:158:230",
    312:"/media/image/picter.png:1072:262:158:230",
    413:"/media/image/picter.png:1250:262:158:230",
    313:"/media/image/picter.png:1428:262:158:230"
},xsize=100,ysize=xsize*1.4556,numbers_k={'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14},dom={'p':100,'b':300,'c':400,'k':200};
for(var x = 0 ;x<8;x++)
{
    cards[(x+102)]="/media/image/pcards1.png:"+(x*198+5)+":0:158:230";
    cards[(x+202)]="/media/image/pcards1.png:"+(x*198+5)+":562:158:230";
    cards[(x+302)]="/media/image/pcards1.png:"+(x*198+5)+":828:158:230";
    cards[(x+402)]="/media/image/pcards1.png:"+(x*198+5)+":281:158:230";
}

//new XButton([Clickable],$P(0,0),$S(100,100)).setFill($C(255,255,255,255));


_Canvas.addEvent("start",function(){
        new CImage([Selectable],$P(-_Canvas._w+13,-_Canvas._h+13),$S(xsize,ysize),"/media/image/fournier_b_1.png");
        new CImage([Selectable],$P(-_Canvas._w+9,-_Canvas._h+9),$S(xsize,ysize),"/media/image/fournier_b_1.png");
        new CImage([Selectable],$P(-_Canvas._w+5,-_Canvas._h+5),$S(xsize,ysize),"/media/image/fournier_b_1.png");
        for(var x in cards)
        {
        new CImage([Drugable],$P(0,0),$S(xsize,ysize),cards[x]);
        }
});


