var Config=require("Config")

var Bullet=require("Bullet");
var GROUP="monster";
cc.Class({
    extends: cc.Component,

    properties: {
        
        enemyPre: cc.Prefab,
        enemyPre1: cc.Prefab,
        enemyPre2: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        var parentNode=this.node.parent;
        var xLength=parentNode.getContentSize().width;
        var p=xLength/5;
        var startPosXs=[-p,-p*2,0,p,p*2];
        this.startPosXs=startPosXs;
        //普通怪物
        this.enemyPool=new cc.NodePool();
        this.init(this.enemyPool,100,this.enemyPre);

        this.enemyPool1=new cc.NodePool();
        this.init(this.enemyPool1,20,this.enemyPre1);
        this.flag=true;
        //cc.log(startPosXs)
    },
    init:function(enemyPool,num,pre){
        
        
        for(var i=0;i<num;i++){
            let enemy = cc.instantiate(pre); // 创建节点
            
            //enemyPre.parent=parent;
            //this.initEnemyPre(enemyPre,parent);
            enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }
        //return this.enemyPool;
    },
    initEnemyPre:function(enemyChild,parentNode,positionX){

        enemyChild.bulletArray=new Array();

        enemyChild.x=positionX;
        
        enemyChild.y=parentNode.getContentSize().height/2;
        // this.schedule(function() {
        //     this.bullet.pushBullet(enemyChild,GROUP,-1,0.8);
        // }, 0.4);
        

        var positionMove=cc.p(0,-parentNode.getContentSize().height);
        var actionCallbackFunction = cc.callFunc(this.destroyEnemy, this);
        var seq=cc.sequence(
                 cc.moveBy(5, positionMove), 
                 actionCallbackFunction
             )
        seq.setTag(1001)
        enemyChild.runAction(seq);
        //cc.log(parentNode.getContentSize().y/2)
    },
    destroyEnemy : function(target){
        //cc.log(this.enemyPool);
        //target.stopActionByTag(1001);
        this.enemyPool.put(target);
        target.removeFromParent();
    },

    createEnemy: function (type,parentNode,positionX) {
        var enemyChild = null;
        var enemys=null;
        var enemyPre=null;
        var blood=3;
        switch(type){
            case 0:
                enemys=this.enemyPool;
                enemyPre=this.enemyPre;
            break;
            case 1:
                blood=5
                enemyPre=this.enemyPre1;
                enemys=this.enemyPool1;
            break;
        }
        if (enemys.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemyChild = enemys.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemyChild = cc.instantiate(enemyPre);
        }
        enemyChild.group=GROUP;
        //血量
        enemyChild.blood=blood;
        //绑定爆炸动画
        var anim = enemyChild.getComponent(cc.Animation);
        
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
            
            this.createEnemy(0,parentNode,zf);
            
            if(count%30==0){
                    this.createEnemy(1,parentNode,zf);
                }

            count++;
        }, 0.4);
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
