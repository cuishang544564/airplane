const BULLET="bullet";
const HERO="hero";

const ENEMY0="enemy0";
const ENEMY1="enemy1";
const GROUP_HERO_BULLET="hero_bullet"

var Hero=require("Hero");
var Enemy=require("Enemy");
var Bullet=require("Bullet");
cc.Class({
    extends: cc.Component,

    properties: {
        type:""
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        
        this.touchingNumber = 0;
    },
    
    onCollisionEnter: function (other) {
        this.node.color = cc.Color.RED;
        
        var parent=this.node.parent;
        var nodeName=this.node.name;
        
        switch(nodeName){
            case BULLET:
                this.node.getComponent(Bullet).destroyBullet(this.node);
            break;
            case ENEMY0: case ENEMY1:
                //if(other.name==BULLET&&other.group==GROUP_HERO_BULLET){
                    
                    var blood=this.node.blood;
                    this.node.blood--;
                    cc.log(this.node.blood);
                    if(this.node.blood==1){
                        this.node.stopActionByTag(1001);
                        var anim = this.node.getComponent(cc.Animation);
                        anim.on('finished',      this.destoryEnemy,        this);
                        anim.speed = 0.5;
                        if(nodeName==ENEMY0){
                            anim.play("boom");
                        }else{
                            anim.play("boom1");
                        }
                        
                        //this.node.getComponent(Enemy).destroyEnemy(this.node);
                    }
                    // switch(this.node.blood){
                        
                    //     case 3:

                        
                    //     break;
                    //     case 2:

                        
                    //     break;
                    //     case 1:

                        
                    //     //console.log(this.node.getComponent(Enemy))
                    //     var anim = this.node.getComponent(cc.Animation);
                        
                    //     anim.play();
                    //     //this.node.getComponent(Enemy).destroyEnemy(this.node);
                    //     break;
                        
                    // }
                //}
            break;
        }
        this.touchingNumber ++;
        
    },
    destoryEnemy:function(){
        this.node.getComponent(Enemy).destroyEnemy(this.node);
    },
    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },
    
    onCollisionExit: function () {
        this.touchingNumber --;
        
            this.node.color = cc.Color.WHITE;
        
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
