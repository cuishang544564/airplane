var Hero=require("Hero");
var Enemy=require("Enemy");
cc.Class({
    extends: cc.Component,

    properties: {
       hero:{
            default: null,
            type: Hero
        },
        enemy:{
            default:null,
            type:Enemy
        },
        enemyPre: cc.Prefab,
        enemyPre1: cc.Prefab,
        enemyPre2: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {

        this.setEventManager();

        
        //this.hero.pushBullet(this.node);
        this.enemy.init(100,this.enemyPre,this.node);
        
    },
    start:function(){
        cc.log("hello")
        this.enemy.createEnemysToDestory(this.node,5)
    },
    setEventManager:function(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var position=event.getLocation();
            //console.log(this.hero.node.position)
            
            
            //this.hero.position();
            this.hero.moveTo(this.node.convertToNodeSpaceAR(event.getLocation()))
        //console.log(this.node.convertToNodeSpaceAR(event.getLocation()));
        //console.log("hero"+this.hero.node.position+"#"+this.hero.node.x+"#"+this.hero.node.y)
        }, this);
    },
    
    
    // called every frame
    update: function (dt) {

    },
});
