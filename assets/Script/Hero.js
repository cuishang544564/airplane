var Bullet=require("Bullet");
var GROUP="hero_bullet"
cc.Class({
    extends: cc.Component,

    
    properties: {
        bullet:{
            default: null,
            type: Bullet
        }    
    },
    // use this for initialization
    onLoad: function () {
        this.node.bulletArray=new Array();
    },
    start:function(){
        
        this.schedule(function() {
            this.bullet.pushBullet(this.node,GROUP,1,0.2);
        }, 0.1);
    },
    
    
    
    moveTo:function(position){
        //this.node.runAction(cc.moveTo(1, position))
        this.node.x=position.x;
        this.node.y=position.y;
        
        //cc.log(1)
    },
    // called every frame
    update: function (dt) {

    },
});
