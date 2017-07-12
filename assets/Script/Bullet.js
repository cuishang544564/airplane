//var bulletChildList=new Array();
//var positionMove=cc.p(0,100);
cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Prefab,
        
    },

    // use this for initialization
    onLoad: function () {
        //this.node.masterNode=null;

        this.bulletChildList=new Array()
        this.bulletPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
        let bulletPre = cc.instantiate(this.bullet); // 创建节点
        this.bulletPool.put(bulletPre); // 通过 putInPool 接口放入对象池
        }
    },
    
    createBullet: function (master,group,direction) {
        
        var parentNode=master.parent;
        if(parentNode==null){
            this.unschedule();
            // for(var lIndex=0;lIndex<this.bulletChildList.length;lIndex++){
            //     this.destroyBullet(this.bulletChildList[lIndex])
            // }
            return;
        }
        let bulletChild = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bulletChild = this.bulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            bulletChild = cc.instantiate(this.bullet);
        }
        bulletChild.group=group;
        this.bulletChildList.push(bulletChild);
        bulletChild.masterNode=master;
        bulletChild.parent = parentNode; // 将生成的敌人加入节点树
        var positionMove;
        //console.log(master.parent)
        if(direction>0){
            positionMove=cc.p(0,parentNode.getContentSize().height);
        }else{
            positionMove=cc.p(0,-parentNode.getContentSize().height);
        }
        this.init(positionMove,bulletChild,master)
        //cc.log(master.bulletArray)
        master.bulletArray.push(bulletChild);
        //this.init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    },
    pushBullet:function(master,group,direction){
        

        if(master==null){
            console.log("node null")
        }
        this.createBullet(master,group,direction);
        
        //this.createBullet(parentNode);
    },
    init:function(positionMove,child,master){
        child.x=master.x;
        child.y=master.y;
        var actionCallbackFunction = cc.callFunc(this.destroyBullet, this,100);

        child.runAction(cc.sequence(
                 cc.moveBy(2, positionMove), 
                 actionCallbackFunction
             ));
        
                        
    },
    destroyBullet : function(target,num){
        //cc.log(num);
        this.bulletPool.put(target);
        var masterNode=target.masterNode;
        if(masterNode!=null){
            var childIndex=masterNode.bulletArray.indexOf(target);
            
             if(childIndex>-1){
                 masterNode.bulletArray.splice(childIndex,1);
             }
            //cc.log(masterNode)
        }
        target.removeFromParent();
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
