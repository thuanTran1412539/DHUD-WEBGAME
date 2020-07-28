var game = {
  // an object where to store game information
  data: {
    // score
    score: 0
  },
  // Run on page load.
  onload: function () {
    // Initialize the video: create a canvas based on the given arguments
    //init(width, height, optionsopt)
    if (!me.video.init(640, 480, { wrapper: 'screen', scale: 'auto', scaleMethod: 'flex-width' })) {
      alert('Your browser does not support HTML5 canvas.');
      return;
    }
    // initialize the "sound engine", giving "mp3" as default desired audio format, and "ogg" as a fallback
    var audio = me.audio.init('mp3,ogg');

    if (!audio) {
      alert('Sorry but your browser does not support html 5 audio!');
      return;
    }
    // set and load all resources.
    // me.loader: namespace manage loading of stuff and manage resources
    // automatically switch to the loading screen
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  // Run on game resources loaded.
  loaded: function () {
    // connect state to stateId (stateId, state object)
    me.state.set(me.state.PLAY, new game.PlayScreen());

    // register our entities into pool
    // param1: as defined in the Name field of the Object Properties (in Tiled)
    // param2: entity name
    me.pool.register('main', game.Player);
    me.pool.register('coin', game.Coin);

    // start the game
    me.state.change(me.state.PLAY);
  }
};
