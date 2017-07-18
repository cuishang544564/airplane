var Hero=require("Hero");
var Enemy=require("Enemy");
cc.Class({
    extends: cc.Component,
    
    properties: {
       hero:{
            default: null,
            type: cc.Node
        },
        score:{
            default: null,
            type: cc.Label,
        },
        enemy:{
            default:null,
            type:cc.Node
        },
        
    },
    
    // use this for initialization
    onLoad: function () {
        
        this.setEventManager();
        //this.score.removeFromParent();
        this.score;
        this.score.string=0;
        //this.hero.pushBullet(this.node);
        
        
    },
    start:function(){
        cc.log("hello")
        this.enemy.getComponent(Enemy).createEnemysToDestory(this.node,5)
    },
    setEventManager:function(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var position=event.getLocation();
            //console.log(this.hero.node.position)
            
            
            //this.hero.position();
            this.hero.getComponent(Hero).moveTo(this.node.convertToNodeSpaceAR(event.getLocation()))
        //console.log(this.node.convertToNodeSpaceAR(event.getLocation()));
        //console.log("hero"+this.hero.node.position+"#"+this.hero.node.x+"#"+this.hero.node.y)
        }, this);
    },
    
    

    // called every frame
    update: function (dt) {
        //this.gainScore();
    },
});
