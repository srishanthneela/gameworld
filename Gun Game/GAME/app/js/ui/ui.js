var ui = {
    colors: {
        //add colors here...
    },

    titleFont: "Permanent Marker",
    defaultFont: "Eczar",
    secondaryFont: "Arial",

    makeBasicText: function(parent, text, size, x, y) {
        var textElement = new createjs.Text(text, size + " " + this.defaultFont, "rgb(0,0,0)");
        textElement.x = x;
        textElement.y = y;
        textElement.textAlign = "center";
        textElement.textBaseline = "middle";
        parent.addChild(textElement);

        return textElement;
    },

    makeTitleText: function(parent, text, size, x, y) {
        var textElement = new createjs.Text(text, size + " " + this.titleFont, "rgb(0,0,0)");
        textElement.x = x;
        textElement.y = y;
        textElement.textAlign = "center";
        textElement.textBaseline = "middle";
        parent.addChild(textElement);

        return textElement;
    },

    makeBasicButton: function(parent, text, x, y, callbackFunc) {
        var BUTTON_WIDTH = 100;
        var BUTTON_HEIGHT = 50;

        var buttonElement = new createjs.Container();
        buttonElement.x = x - BUTTON_WIDTH / 2;
        buttonElement.y = y;
        parent.addChild(buttonElement);

        var shape = new createjs.Shape();
        shape.graphics.beginStroke("rgb(0,0,0)").drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        shape.graphics.beginFill("rgb(255,255,255)").drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        buttonElement.addChild(shape);

        var text = this.makeBasicText(buttonElement, text, "14px", BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);

        buttonElement.on("mousedown", callbackFunc);

        return buttonElement;
    },

    makeStatButton: function(parent, x, y, statTitle) {
        var BUTTON_HEIGHT = 160;
        var BUTTON_WIDTH = 75;

        var statValue = stats.getStatValue(statTitle);

        var mainContainer = new createjs.Container();
        mainContainer.x = x - BUTTON_WIDTH / 2;
        mainContainer.y = y;
        mainContainer.regX = BUTTON_WIDTH / 2;
        mainContainer.regY = BUTTON_HEIGHT / 2;
        parent.addChild(mainContainer);

        var buttonShape = new createjs.Shape();
        buttonShape.graphics.beginStroke("black").drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        mainContainer.addChild(buttonShape);

        

        var upButton = new createjs.Container();
        var upButtonShape = new createjs.Shape();
        upButton.setBounds(0, 0, BUTTON_WIDTH, 50);
        //upButtonShape.graphics.beginStroke("black").drawRect(0, 0, upButton.getBounds().width, upButton.getBounds().height);
        var downButton = new createjs.Container();
        var downButtonShape = new createjs.Shape();
        downButton.setBounds(0, 0, BUTTON_WIDTH, 50);
        //downButtonShape.graphics.beginStroke("black").drawRect(0, 0, downButton.getBounds().width, downButton.getBounds().height);
        downButton.y = BUTTON_HEIGHT - 50;

        var upTriangle = new createjs.Shape();
        upTriangle.x = upButton.getBounds().width / 2;
        upTriangle.y = upButton.getBounds().height / 2;
        upTriangle.graphics.beginFill("black").dp(0, 0, 20, 3);
        upTriangle.rotation = 30;
        var downTriangle = new createjs.Shape();
        downTriangle.x = downButton.getBounds().width / 2;
        downTriangle.y = downButton.getBounds().height / 2;
        downTriangle.graphics.beginFill("black").dp(0, 0, 20, 3);
        downTriangle.rotation = 210;

        if (statValue <= STAT_MIN) { downTriangle.visible = false; }
        if (statValue >= STAT_MAX) { upTriangle.visible = false; }

        var statText = this.makeBasicText(mainContainer, statValue, "32px", BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);
        var statLabel = this.makeBasicText(mainContainer, statTitle.toUpperCase(), "16px", BUTTON_WIDTH / 2, BUTTON_HEIGHT + 25);

        upButton.addChild(upTriangle);
        upButton.addChild(upButtonShape);
        downButton.addChild(downTriangle);
        downButton.addChild(downButtonShape);
        mainContainer.addChild(upButton);
        mainContainer.addChild(downButton);

        upButton.on("mousedown", function() {
            stats.statUp(statTitle);
            statValue = stats.getStatValue(statTitle);
            statText.text = statValue;
            if (statValue === STAT_MAX) {
                upTriangle.visible = false;
            }
            if (statValue > STAT_MIN) {
                downTriangle.visible = true;
            }
        });
        downButton.on("mousedown", function() {
            stats.statDown(statTitle);
            statValue = stats.getStatValue(statTitle);
            statText.text = statValue;
            if (statValue === STAT_MIN) {
                downTriangle.visible = false;
            }
            if (statValue < STAT_MAX) {
                upTriangle.visible = true;
            }
        });

        return mainContainer;
    },

    makeHealthBar: function(parent, x, y, healthStat) {
        var WIDTH = 200;
        var HEIGHT = 35;

        var fullHealth = healthStat;

        var healthBar = new createjs.Container();
        healthBar.x = x;
        healthBar.y = y;
        parent.addChild(healthBar);

        var background = new createjs.Shape();
        background.graphics.beginStroke("rgb(0, 0, 0)").drawRect(0, 0, WIDTH, HEIGHT);
        healthBar.addChild(background);

        var health = new createjs.Shape();
        health.graphics.beginFill("rgb(255, 0, 0)").drawRect(0, 0, WIDTH, HEIGHT);
        healthBar.addChild(health);

        healthBar.update = function(currentHealth) {
            health.scaleX = (currentHealth / fullHealth);
        }

        return healthBar;
        
    }
}