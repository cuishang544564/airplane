const BULLET="bullet";
const HERO="hero";
var Hero=require("Hero");
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
        
        if(this.node.name==BULLET){
            //var hero=parent.getChildByName(HERO);
            //console.log(this.node)
            this.node.getComponent(Bullet).destroyBullet(this.node);
        }
        this.touchingNumber ++;
        
    },
    
    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },
    
    onCollisionExit: function () {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
