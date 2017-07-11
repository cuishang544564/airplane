var Bullet=require("Bullet");
var GROUP="monster";
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
        var parentNode=this.node.parent;
        var xLength=parentNode.getContentSize().width;
        var p=xLength/5;
        var startPosXs=[-p,-p*2,0,p,p*2];
        this.startPosXs=startPosXs;
        
        this.flag=true;
        //cc.log(startPosXs)
    },
    init:function(num,pre,parent){
        var enemyPool=new cc.NodePool();
        this.enemyPool=enemyPool;
        for(var i=0;i<num;i++){
            let enemyPre = cc.instantiate(pre); // 创建节点
            //enemyPre.parent=parent;
            //this.initEnemyPre(enemyPre,parent);
            enemyPool.put(enemyPre); // 通过 putInPool 接口放入对象池
        }
        return enemyPool;
    },
    initEnemyPre:function(enemyChild,parentNode,positionX){
        enemyChild.x=positionX;
        
        enemyChild.y=parentNode.getContentSize().height/2;
        //this.bullet.pushBullet(enemyChild,GROUP,-1,0.8);

        var positionMove=cc.p(0,-parentNode.getContentSize().height);
        var actionCallbackFunction = cc.callFunc(this.destroyEnemy, this);
        enemyChild.runAction(cc.sequence(
                 cc.moveBy(5, positionMove), 
                 actionCallbackFunction
             ));
        //cc.log(parentNode.getContentSize().y/2)
    },
    destroyEnemy : function(target){
        
        this.enemyPool.put(target);
        target.stopAllActions();
    },
    createEnemy: function (parentNode,positionX) {
        var enemyChild = null;
        if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemyChild = this.enemyPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemyChild = cc.instantiate(pre);
        }
        enemyChild.group=GROUP;
        
        enemyChild.parent = parentNode; // 将生成的敌人加入节点树
        this.initEnemyPre(enemyChild,parentNode,positionX)
        //this.init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    },
    createEnemysToDestory:function(parentNode,enemyNum){
        var enemys=new Array();
        var count=0;
        this.schedule(function() {
            if (this.count === enemyNum) {
                
                this.unschedule(this.callback);
            }
            var zf;
            if(this.flag){
                
                zf=Math.random()*(parentNode.getContentSize().width/2);
                this.flag=false;
            }else{
                zf=-Math.random()*(parentNode.getContentSize().width/2);
                this.flag=true;
            }
            
                this.createEnemy(parentNode,zf);
            

            this.count++;
        }, 0.4);
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
