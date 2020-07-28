game.PlayScreen = me.Stage.extend({
  /**
   *  action to perform on state change
   */

  onResetEvent: function () {
    // load map
    me.levelDirector.loadLevel('area01');

    // set new score
    game.data.score = 0;

    // play bgm
    me.audio.playTrack('theme', true);

    // add a score HUD
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    // add main player
    me.game.world.addChild(me.pool.pull('main', 55, 355), 5);

    // generate coins randomly
    var arrayCoins = generateCoins();
    arrayCoins.forEach(function (item) {
      me.game.world.addChild(me.pool.pull('coin', item, Math.trunc(Math.random() * 350)), 5);
    });

    // bind movement key
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.A, 'left');
    me.input.bindKey(me.input.KEY.D, 'right');
    me.input.bindKey(me.input.KEY.UP, 'jump', true);
    me.input.bindKey(me.input.KEY.SPACE, 'jump', true);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function () {
    me.audio.stopTrack();
    me.game.world.removeChild(this.HUD);

    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);
    me.input.unbindKey(me.input.KEY.UP);
    me.input.unbindKey(me.input.KEY.SPACE);
  }
});

function generateCoins() {
  var arrayCoins = [];
  var isExist = false;
  for (var i = 0; i < 10; i++) {
    if (arrayCoins.length) {
      do {
        isExist = false;
        var newValue = Math.trunc(Math.random() * 4000);
        for (var j = 0; j < arrayCoins.length; j++) {
          if (Math.abs(arrayCoins[j] - newValue) <= 200) {
            isExist = true;
            break;
          }
        }
      } while (isExist);
      arrayCoins.push(newValue);
    } else {
      arrayCoins.push(Math.trunc(Math.random() * 4000));
    }
  }
  return arrayCoins;
}
