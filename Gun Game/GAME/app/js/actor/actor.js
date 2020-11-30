function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};
    this.stats = null;

    this.boundsRadius = r;

}
Actor.prototype.update = function(dt)
{

};

function bitmapActor(nameString, x, y, r, imageID) {
    Actor.call(this, nameString, x, y, r);
    this.image = new createjs.Bitmap(app.assets.getResult(imageID));
    this.image.x = this.pos.x;
    this.image.y = this.pos.y;

    this.image.scale = 0.5;

    this.image.regX = this.image.getBounds().width / 2;
    this.image.regY = this.image.getBounds().height / 2;

    app.stage.addChild(this.image);
}
bitmapActor.prototype = Object.create(Actor.prototype);
bitmapActor.prototype.constructor = bitmapActor;
bitmapActor.prototype.update = function(dt) {
    this.image.x= this.pos.x;
    this.image.y= this.pos.y;

    Actor.prototype.update.call(this, dt);
}

function spriteActor(nameString, x, y, r, imageID) {
    Actor.call(this, nameString, x, y, r);
    this.image = new createjs.Sprite(app.assets.getResult(imageID));
    this.image.x = this.pos.x;
    this.image.y = this.pos.y;
    this.image.scale = 3;
    //console.log(app.assets.getResult(imageID));

    app.stage.addChild(this.image);
}
spriteActor.prototype = Object.create(Actor.prototype);
spriteActor.prototype.constructor = spriteActor;
spriteActor.prototype.update = function(dt) {
    this.image.x= this.pos.x;
    this.image.y= this.pos.y;

    Actor.prototype.update.call(this, dt);
}

function Enemy(nameString, x, y, r){
    spriteActor.call(this, nameString, x, y, r, "ghost");
    this.stats = { health: 3, dmg: 2};
    this.image.gotoAndPlay("walk");
    //this.image.scale = 3;

    var ball = new createjs.Shape();
    // ball.graphics.beginStroke("#000").drawCircle(0, 0, r);
    // ball.x = x;
    // ball.y = y;

    // app.stage.addChild(ball);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 40 * dt;
        this.pos.y += Math.sin(angleRad) * 40 * dt;

        spriteActor.prototype.update.call(this, dt);
        // ball.x = this.pos.x;
        // ball.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            app.stage.removeChild(this.image);
            app.enemy1Array.splice(app.enemy1Array.indexOf(this), 1);
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            app.enemy1Array.push(new Enemy("ghost", x, 750, 40));
        }
    }
}
Enemy.prototype = Object.create(spriteActor.prototype);
Enemy.prototype.constructor = Enemy;

function Enemy2(nameString, x, y, r){
    spriteActor.call(this, nameString, x, y, r, "skeleton");
    this.stats = { health: 1, dmg: 1 };
    this.image.gotoAndPlay("walk");
    //this.image.scale = 1.5;

    // var ball2 = new createjs.Shape();
    // ball2.graphics.beginStroke("#000").drawCircle(0, 0, r);
    // ball2.x = x;
    // ball2.y = y;

    // app.stage.addChild(ball2);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 100 * dt;
        this.pos.y += Math.sin(angleRad) * 100 * dt;

        spriteActor.prototype.update.call(this, dt);
        // ball2.x = this.pos.x;
        // ball2.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            app.stage.removeChild(this.image);
            app.enemy2Array.splice(app.enemy2Array.indexOf(this), 1);
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            app.enemy2Array.push(new Enemy2("skeleton", x, 850, 10));
        }
    }
}
Enemy2.prototype = Object.create(spriteActor.prototype);
Enemy2.prototype.constructor = Enemy2;

function Enemy3(nameString, x, y, r){
    spriteActor.call(this, nameString, x, y, r, "bat");
    this.stats = { health: 3, dmg: 3 };
    this.image.gotoAndPlay("walk");

    // var ball3 = new createjs.Shape();
    // ball3.graphics.beginStroke("#000").drawCircle(0, 0, r);
    // ball3.x = x;
    // ball3.y = y;

    // app.stage.addChild(ball3);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 60 * dt;
        this.pos.y += Math.sin(angleRad) * 60 * dt;

        spriteActor.prototype.update.call(this, dt);
        // ball3.x = this.pos.x;
        // ball3.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            app.stage.removeChild(this.image);
            app.enemy3Array.splice(app.enemy3Array.indexOf(this), 1);
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            app.enemy3Array.push(new Enemy3("bat", x, -200, 30));
        }
    }
}
Enemy3.prototype = Object.create(spriteActor.prototype);
Enemy3.prototype.constructor = Enemy3;

function Boss(nameString, x, y, width, height, r){
    spriteActor.call(this, nameString, x, y, r, "frog");
    this.stats = { health: 5, dmg: 5 };
    this.image.gotoAndPlay("walk");
    this.image.scale = 2.5;

    // var bossCircle = new createjs.Shape();
    // bossCircle.graphics.beginStroke("#F00").drawRect(0, 0, width, height);
    // bossCircle.x = x;
    // bossCircle.y = y;
    // bossCircle.setBounds(0, 0, width, height);
    // bossCircle.regX = width/2;
    // bossCircle.regY = height/2;

    // app.stage.addChild(bossCircle);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 25 * dt;
        this.pos.y += Math.sin(angleRad) * 25 * dt;

        spriteActor.prototype.update.call(this, dt);
        // bossCircle.x = this.pos.x;
        // bossCircle.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(entry instanceof Bullet && this.stats.health < 1) {
            thePlayer.bossKills++;
            if(thePlayer.bossKills >= 5) {
                app.setState(STATES.WIN_SCREEN);
            } else {
                this.resetBoss();
            }
        } else if (entry instanceof Player && this.stats.health < 1) {
            this.resetBoss();
        }
        console.log(thePlayer.bossKills);
    }

    this.resetBoss = function() {
        app.stage.removeChild(this.image);
        app.BossArray.splice(app.BossArray.indexOf(this), 1);
    }
}
Boss.prototype = Object.create(spriteActor.prototype);
Boss.prototype.constructor = Boss;

function Player(nameString, x, y, width, height, r) {
    bitmapActor.call(this, nameString, x, y, r, "player");
    this.stats = { health: thePlayer.baseHealth + thePlayer.specials.endurance, dmg: thePlayer.baseDmg }

    // var player = new createjs.Shape();
    // player.graphics.beginFill('#fffff').drawRect(0, 0, width, height);
    // player.x = x;
    // player.y = y;
    // player.setBounds(0, 0, width, height);
    // player.regX = width/2;
    // player.regY = height/2;
    // app.stage.addChild(player);

    var moveSpeed = 150 + (thePlayer.specials.agility * 10);

    this.update = function(dt) {
        var angleRad = Math.atan2(app.mousePos.y - app.playerChar.pos.y, app.mousePos.x - app.playerChar.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.playerChar.rotation = angleDeg;
        this.image.rotation = app.playerChar.rotation;
        if(app.keyboard.w.isPressed)
        {
            app.playerChar.pos.y -= moveSpeed * dt;
            if(app.playerChar.pos.y < 0) {
                app.playerChar.pos.y = 0;
            }
        }
        
        if(app.keyboard.s.isPressed)
        {
            app.playerChar.pos.y += moveSpeed * dt;
            if(app.playerChar.pos.y > SCREEN_HEIGHT) {
                app.playerChar.pos.y = SCREEN_HEIGHT;
            }
        }
        
        if(app.keyboard.d.isPressed) {
            app.playerChar.pos.x += moveSpeed * dt;
            if(app.playerChar.pos.x > SCREEN_WIDTH) {
                app.playerChar.pos.x = SCREEN_WIDTH;
            }
        }
        
        if(app.keyboard.a.isPressed) {
            app.playerChar.pos.x -= moveSpeed * dt;
            if(app.playerChar.pos.x < 0) {
                app.playerChar.pos.x = 0;
            }
        }

        app.BossArray.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy1Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);
        
        app.enemy2Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy3Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        // player.x = app.playerChar.pos.x;
        // player.y = app.playerChar.pos.y;
        bitmapActor.prototype.update.call(this, dt);
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        createjs.Sound.play("hurt");
        if (app.screen instanceof GameplayScreen) { app.screen.healthBar.update(this.stats.health) };
        if(this.stats.health < 1) {
            console.log("Im dead yo");
            app.setState(STATES.GAME_OVER);
        }
    }

    this.collisionCalc = function(entry) {
        this.onCollect(entry);
        entry.onCollect(this);
    }
}
Player.prototype = Object.create(spriteActor.prototype);
Player.prototype.constructor = Player;

function Bullet(nameString, x, y, r) {
    Actor.call(this, nameString, x, y, r);

    var damage;
    if (EASY_MODE) {
        damage = 1000;
    } else {
        damage = 1 + (thePlayer.specials.strength / 2);
    }

    this.stats = {dmg: damage};

    var bullet = new createjs.Shape();
    bullet.graphics.beginFill('#00ff00').drawCircle(0, 0, r);
    app.stage.addChild(bullet);
    var angleRad = Math.atan2(app.mousePos.y - this.pos.y, app.mousePos.x - this.pos.x);
    var angleDeg = angleRad * 180 / Math.PI;
    app.playerChar.rotation = angleDeg;
    
    this.update = function(dt) {
        this.pos.x += Math.cos(angleRad) * 150 * dt;
        this.pos.y += Math.sin(angleRad) * 150 * dt;
        bullet.x = this.pos.x;
        bullet.y = this.pos.y;

        // if(app.keyboard.j.isPressed) {
        //     if(EASY_MODE) {this.stats.dmg = 1000;}
        //     else {this.stats.dmg = 1 + (thePlayer.specials.strength / 2);}
        // }

        app.BossArray.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy1Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy2Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy3Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);
    }

    this.onCollect = function() {
        app.stage.removeChild(bullet);
        app.bullets.splice( app.bullets.indexOf(this), 1 );
    }

    this.collisionCalc = function(entry) {
        this.onCollect();
        entry.onCollect(this);
    }
}
Bullet.prototype = Object.create(Actor.prototype);
Bullet.prototype.constructor = Bullet;