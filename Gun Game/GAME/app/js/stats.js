var STAT_MAX = 5;
var STAT_MIN = 1;
var stats = {

    getStatValue: function(statTitle) {
        var statValue;
        switch (statTitle) {
            case "strength":
                statValue = thePlayer.specials.strength;
                break;
            case "endurance":
                statValue = thePlayer.specials.endurance;
                break;
            case "perception":
                statValue = thePlayer.specials.perception;
                break;
            case "agility":
                statValue = thePlayer.specials.agility;
                break;
            default:
                console.log("STAT NOT FOUND");
                break;
        }
        return statValue;
    },

    statUp: function(stat) {
        if (this.getStatValue(stat) < STAT_MAX) {
            switch (stat) {
                case "strength":
                    thePlayer.specials.strength ++;
                    break;
                case "endurance":
                    thePlayer.specials.endurance ++;
                    break;
                case "perception":
                    thePlayer.specials.perception ++;
                    break;
                case "agility":
                    thePlayer.specials.agility ++;
                    break;
                default:
                    console.log("STAT UP: STAT NOT FOUND!");
                    break;
            }
        }
    },

    statDown: function(stat) {
        if (this.getStatValue(stat) > STAT_MIN) {
            switch (stat) {
                case "strength":
                    thePlayer.specials.strength --;
                    break;
                case "endurance":
                    thePlayer.specials.endurance --;
                    break;
                case "perception":
                    thePlayer.specials.perception --;
                    break;
                case "agility":
                    thePlayer.specials.agility --;
                    break;
                default:
                    console.log("STAT DOWN: STAT NOT FOUND!");
                    break;
            }
        }
    }
};