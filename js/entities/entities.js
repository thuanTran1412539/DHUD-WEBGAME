game.Player = me.Entity.extend({
  /**
   * constructor
   */
  init: function (x, y) {
    this._super(me.Entity, 'init', [
      x,
      y,
      {
        image: 'main',
        width: 49,
        height: 70
      }
    ]);
    this.body.setMaxVelocity(3.8, 18);
    this.body.setFriction(1, 0);

    // this.body.collisionType = me.collision.types.OBJECT;

    //set the camera to follow the specified renderable.
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);
    this.alwaysUpdate = true;

    // add all animation from the character sprite
    this.renderable.addAnimation('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // define a standing animation (using the first frame)
    this.renderable.addAnimation('stand', [4]);

    // jump animation
    this.renderable.addAnimation('jump', [0]);

    // set the standing animation as default
    this.renderable.setCurrentAnimation('stand');
  },

  update: function (dt) {
    if (this.pos.x > 3790) {
      swal({
        title: 'You Won!',
        text: 'your score is: ' + game.data.score,
        icon: 'success',
        buttons: false
      }).then(function (isConfirm) {
        swal.close();
        location.reload();
      });
    }
    if (this.pos.y > 480) {
      me.audio.stopTrack();
      swal({
        title: 'You Lost!',
        text: 'your score is: ' + game.data.score,
        icon: 'info',
        buttons: false
      }).then(function (isConfirm) {
        swal.close();
        location.reload();
      });
    }
    if (me.input.isKeyPressed('left')) {
      // flip the sprite on horizontal axis
      this.renderable.flipX(true);
      // update the default force
      this.body.force.x = -this.body.maxVel.x;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation('walk')) {
        this.renderable.setCurrentAnimation('walk');
      }
    } else if (me.input.isKeyPressed('right')) {
      // unflip the sprite
      this.renderable.flipX(false);
      // update the entity velocity
      this.body.force.x = this.body.maxVel.x;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation('walk')) {
        this.renderable.setCurrentAnimation('walk');
      }
    } else {
      this.body.force.x = 0;
      // change to the standing animation
      this.renderable.setCurrentAnimation('stand');
    }

    if (me.input.isKeyPressed('jump')) {
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.jumping = true;
        this.body.force.y = -this.body.maxVel.y;
        this.renderable.setCurrentAnimation('jump');
      }
    } else {
      this.body.force.y = 0;
    }

    // move the character, return true if x or y is > 0
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
  },
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision: function (response, other) {
    // Make all other objects solid
    return true;
  }
});

game.Coin = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function (x, y) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [
      x,
      y,
      {
        image: 'spinning_coin_gold',
        width: 32,
        height: 32
      }
    ]);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision: function (response, other) {
    // play sound
    me.audio.play('cling');

    // add score
    game.data.score += 10;

    // remove gold
    me.game.world.removeChild(this);

    return false; // true if the object should respond to the collision
  }
});
