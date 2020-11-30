//base screen class
function Screen(name) {
    createjs.Container.call(this);
    this.title = name;
}
Screen.prototype = Object.create(createjs.Container.prototype);
Screen.prototype.constructor = Screen;

//main landing screen
function LandingScreen(playButton, instructionsButton) {
    Screen.call(this, "landing_screen");

    var screen = new createjs.Shape();
    screen.graphics.beginFill('#fff').beginStroke('#000').drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.addChild(screen);

    ui.makeTitleText(this, "CRYPTIDS DECLASSIFIED", "60px", SCREEN_WIDTH / 2, (SCREEN_HEIGHT / 2) - 150);

    ui.makeStatButton(this, ((SCREEN_WIDTH / 2) + 40) - 150, SCREEN_HEIGHT / 2, "strength");
    ui.makeStatButton(this, ((SCREEN_WIDTH / 2) + 40) - 50, SCREEN_HEIGHT / 2, "endurance");
    ui.makeStatButton(this, ((SCREEN_WIDTH / 2) + 40) + 50, SCREEN_HEIGHT / 2, "perception");
    ui.makeStatButton(this, ((SCREEN_WIDTH / 2) + 40) + 150, SCREEN_HEIGHT / 2, "agility");
    
    ui.makeBasicButton(this, "PLAY", SCREEN_WIDTH / 2, 450, playButton);
    ui.makeBasicButton(this, "HOW TO PLAY", SCREEN_WIDTH / 2, 500, instructionsButton);

    ui.makeBasicButton(this, "MUTE", SCREEN_WIDTH - 100, 50, function() {
        if (app.music.muted) {
            app.music.muted = false;
        } else {
            app.music.muted = true;
        }
    });
    ui.makeBasicButton(this, "CREDITS", 0 + 100, 50, function() {
        app.setState(STATES.CREDITS);
    })
}
LandingScreen.prototype = Object.create(Screen.prototype);
LandingScreen.prototype.constructor = LandingScreen;

//instructions screen
function InstructionScreen(backButton) {
    Screen.call(this, "instruction_screen");

    //filler text; tweak later to accomodate any new features/additions
    var text = "Move with the W, A, S, and D keys. Click to shoot, and avoid the cryptids!";

    ui.makeBasicText(this, text, "20px", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ui.makeBasicButton(this, "BACK", 50, 10, backButton);
}
InstructionScreen.prototype = Object.create(createjs.Container.prototype);
InstructionScreen.prototype.constructor = InstructionScreen;

//main game screen
function GameplayScreen() {
    Screen.call(this, "gameplay_screen");

    this.healthBar = ui.makeHealthBar(this, 20, 20, app.playerChar.stats.health);
    this.easyMode = ui.makeBasicText(this, "EASY MODE ON: INSTA-KILL!", "16px", 125, 75);
    this.easyMode.visible = false;
}
GameplayScreen.prototype = Object.create(createjs.Container.prototype);
GameplayScreen.prototype.constructor = GameplayScreen;

//game over screen
function GameOverScreen(playAgainButton, mainMenuButton) {
    Screen.call(this, "gameover_screen");

    var background = new createjs.Shape();
    background.graphics.beginFill('#fff').beginStroke('#000').drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.addChild(background);
    
    ui.makeBasicText(this, "GAME OVER", "60px", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ui.makeBasicText(this, "Guess you weren't up to the task...", "35px", SCREEN_WIDTH / 2, (SCREEN_HEIGHT / 2) + 35);

    ui.makeBasicButton(this, "TRY AGAIN?", (SCREEN_WIDTH / 2) - 50, (SCREEN_HEIGHT / 2) + 50, playAgainButton);
    ui.makeBasicButton(this, "MAIN MENU", (SCREEN_WIDTH / 2) + 50, (SCREEN_HEIGHT / 2) + 50, mainMenuButton);
    
}
GameOverScreen.prototype = Object.create(createjs.Container.prototype);
GameOverScreen.prototype.constructor = GameOverScreen;

//win screen
function WinScreen(playAgainButton, mainMenuButton) {
    Screen.call(this, "win_screen");
    
    ui.makeBasicText(this, "VICTORIOUS", "60px", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ui.makeBasicText(this, "As you leave, you can't help but feel...watched.", "35px", SCREEN_WIDTH / 2, (SCREEN_HEIGHT / 2) + 35);

    ui.makeBasicButton(this, "HEAD BACK IN?", (SCREEN_WIDTH / 2) - 75, (SCREEN_HEIGHT / 2) + 50, playAgainButton);
    ui.makeBasicButton(this, "MAIN MENU", (SCREEN_WIDTH / 2) + 20, (SCREEN_HEIGHT / 2) + 50, mainMenuButton);
}
WinScreen.prototype = Object.create(createjs.Container.prototype);
WinScreen.prototype.constructor = WinScreen;

function CreditsScreen(backButton) {
    Screen.call(this, "credit_screen");
    var background = new createjs.Shape();
    background.graphics.beginFill("white").drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    background.graphics.beginStroke("black").drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.addChild(background);
    ui.makeBasicButton(this, "BACK", 0 + 100, 50, backButton);
    ui.makeTitleText(this, "CREDITS", "60px", SCREEN_WIDTH / 2, 200);

    //zach credits
    ui.makeTitleText(this, "ZACH PETERSON", "18px", 200, 275);
    ui.makeBasicText(this, "PLAYER STAT CONCEPT AND INTEGRATION", "16px", 200, 300);
    ui.makeBasicText(this, "ENEMY FOLLOWING LOGIC/PLAYER LOGIC", "16px", 200, 325);
    ui.makeBasicText(this, "WIN/LOSE CONDITION INTEGRATION", "16px", 200, 350);
    //ryan credits
    ui.makeTitleText(this, "RYAN SPARGO", "18px", SCREEN_WIDTH - 200, 275);
    ui.makeBasicText(this, "SCREENS/UI ELEMENTS", "16px", SCREEN_WIDTH - 200, 300);
    ui.makeBasicText(this, "SOUND EFFECTS", "16px", SCREEN_WIDTH - 200, 325);
    ui.makeBasicText(this, "SPRITE/SFX INTEGRATION", "16px", SCREEN_WIDTH - 200, 350);
    ui.makeBasicText(this, "MISC. CODE CLEANUP", "16px", SCREEN_WIDTH - 200, 375);
    //josh credits
    ui.makeTitleText(this, "JOSH YOUNG", "18px", 200, 475);
    ui.makeBasicText(this, "ENEMY ASSISTANCE", "16px", 200, 500);
    //asset credits
    ui.makeTitleText(this, "ASSETS PROVIDED", "18px", SCREEN_WIDTH - 200, 475);
    ui.makeBasicText(this, "MONSTER SPRITES - https://ansimuz.itch.io/grotto-escape-chibi-monsters", "12px", SCREEN_WIDTH - 230, 500);
    ui.makeBasicText(this, "PLAYER SPRITE - https://opengameart.org/content/animated-top-down-survivor-player", "12px", SCREEN_WIDTH - 230, 525);
    ui.makeBasicText(this, "BACKGROUND MUSIC - https://www.dl-sounds.com/royalty-free/tribal-ritual/", "12px", SCREEN_WIDTH - 230, 550);
}
CreditsScreen.prototype = Object.create(createjs.Container.prototype);
CreditsScreen.prototype.constructor = CreditsScreen;