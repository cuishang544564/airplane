var bulletChildList=new Array();
var positionMove=cc.p(0,100)
cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        this.bulletPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
        let bulletPre = cc.instantiate(this.bullet); // 创建节点
        this.bulletPool.put(bulletPre); // 通过 putInPool 接口放入对象池
        }
    },
    
    moveTo:function(position){
        //this.node.runAction(cc.moveTo(1, position))
        this.node.x=position.x;
        this.node.y=position.y;
        
        //cc.log(1)
    },
    
    
    createBullet: function (parentNode) {
        let bulletChild = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bulletChild = this.bulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            bulletChild = cc.instantiate(this.bullet);
        }
        bulletChildList.push(bulletChild);
        
        bulletChild.parent = parentNode; // 将生成的敌人加入节点树
        this.init(cc.p(0,parentNode.getContentSize().height),bulletChild)
        //this.init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    },
    pushBullet:function(parentNode){
        if(parentNode==null){
            cc.log("node null")
        }
        this.schedule(function() {
            // 这里的 this 指向 component
            this.createBullet(parentNode);
        }, 0.2);
        //this.createBullet(parentNode);
    },
    init:function(positionMove,child){
        child.x=this.node.x;
        child.y=this.node.y;
        var actionCallbackFunction = cc.callFunc(this.destroyBullet, this);

        child.runAction(cc.sequence(
                 cc.moveBy(2, positionMove), 
                 actionCallbackFunction
             ));
        //this.bulletPool.put(child);
                        // bulletChildList.splice(0,1);
                        // child.stopAllActions();
                        
    },
    destroyBullet : function(target,data){
        this.bulletPool.put(target);
        bulletChildList.splice(0,1);
        target.stopAllActions();
    },
    // called every frame
    update: function (dt) {

    },
});
