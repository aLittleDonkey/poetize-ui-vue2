// <canvas class="illo" style="max-width: 250px;max-height: 250px;touch-action: none"></canvas>

// Made with Zdog
var BokehShape = Zdog.Shape.subclass({
  bokehSize: 5,
  bokehLimit: 64
});
BokehShape.prototype.updateBokeh = function () {
  // bokeh 0 -> 1
  this.bokeh = Math.abs(this.sortValue) / this.bokehLimit;
  this.bokeh = Math.max(0, Math.min(1, this.bokeh));
  return this.bokeh;
};
BokehShape.prototype.getLineWidth = function () {
  return this.stroke + this.bokehSize * this.bokeh * this.bokeh;
};
BokehShape.prototype.getBokehAlpha = function () {
  var alpha = 1 - this.bokeh;
  alpha *= alpha;
  return alpha * 0.8 + 0.2;
};
BokehShape.prototype.renderCanvasDot = function (ctx) {
  this.updateBokeh();
  ctx.globalAlpha = this.getBokehAlpha(); // set opacity
  Zdog.Shape.prototype.renderCanvasDot.apply(this, arguments);
  ctx.globalAlpha = 1; // reset
};
BokehShape.prototype.renderPath = function (ctx, renderer) {
  this.updateBokeh();
  // set opacity
  if (renderer.isCanvas) {
    ctx.globalAlpha = this.getBokehAlpha();
  }
  Zdog.Shape.prototype.renderPath.apply(this, arguments);
  // reset opacity
  if (renderer.isCanvas) {
    ctx.globalAlpha = 1;
  }
};
var TAU = Zdog.TAU;

function makeMadeline(isGood, colors, options) {
  var rotor = new Zdog.Anchor(options);
  var body = new Zdog.Group({
    addTo: rotor,
    rotate: {x: -TAU / 8},
    translate: {z: -48},
    updateSort: true
  });
  var head = new Zdog.Anchor({
    addTo: body,
    translate: {y: -11, z: -2},
    rotate: {x: TAU / 8}
  });
  // face
  var face = new Zdog.Ellipse({
    diameter: 6,
    addTo: head,
    translate: {z: 4},
    stroke: 8,
    color: colors.skin
  });
  var eyeGroup = new Zdog.Group({
    addTo: face,
    translate: {z: face.stroke / 2 - 0.5}
  });
  // eyes
  [-1, 1].forEach(function (xSide) {
    // cheek blush
    if (isGood) {
      new Zdog.Ellipse({
        width: 2,
        height: 1.3,
        addTo: eyeGroup,
        translate: {x: 4.5 * xSide, y: 3, z: -1},
        rotate: {y: -TAU / 16 * xSide},
        stroke: 1,
        color: '#FA8',
        fill: true
      });
    }
    var eyeX = 3.5 * xSide;
    // eye
    new Zdog.Ellipse({
      width: 0.75,
      height: 1.5,
      addTo: eyeGroup,
      color: colors.eye,
      translate: {x: eyeX},
      stroke: 2,
      fill: true
    });
    // eye brow
    new Zdog.Ellipse({
      addTo: eyeGroup,
      height: 3,
      width: 1.2,
      quarters: 2,
      translate: {x: eyeX, y: -3},
      rotate: {z: -TAU / 4 + 0.15 * xSide * (isGood ? 1 : -1)},
      color: colors.hair,
      stroke: 1,
      fill: false,
      closed: true
    });
  });
  // hair ball
  new Zdog.Shape({
    path: [
      {x: -1},
      {x: 1},
      {z: -4}],
    addTo: head,
    translate: {y: -4, z: -1},
    stroke: 18,
    color: colors.hair
  });
  var bang = new Zdog.Shape({
    path: [
      {},
      {
        arc: [
          {z: 4, y: 4},
          {z: 0, y: 8}]
      }],
    addTo: head,
    translate: {x: 2, y: -7.5, z: 6},
    rotate: {x: 0.5, z: -0.5},
    stroke: 4,
    color: colors.hair,
    closed: false
  });
  bang.copy({
    translate: {x: 5, y: -6, z: 5},
    rotate: {x: -0.3, z: -0.5}
  });
  bang.copy({
    translate: {x: 5, y: -6, z: 3},
    rotate: {y: -0.7, z: -1}
  });
  // left side
  bang.copy({
    translate: {x: -2, y: -7.5, z: 6},
    rotate: {x: 0, z: TAU / 16 * 6}
  });
  bang.copy({
    translate: {x: -5, y: -6, z: 5},
    rotate: {x: 0, z: TAU / 4}
  });
  bang.copy({
    translate: {x: -5, y: -6, z: 3},
    rotate: {y: 0.7, z: 1}
  });
  // hair cover
  new Zdog.Shape({
    path: [
      {x: -3},
      {x: 3}],
    addTo: head,
    stroke: 7,
    translate: {y: -8, z: 5},
    color: colors.hair
  });
  // trail locks
  var trailLock = new Zdog.Shape({
    path: [
      {y: -4, z: 0},
      {
        bezier: [
          {y: -10, z: -14},
          {y: 0, z: -16},
          {y: 0, z: -26}]
      }],
    addTo: head,
    translate: {z: -4, y: 0},
    stroke: 10,
    color: colors.hair,
    closed: false
  });
  trailLock.copy({
    translate: {x: -3, z: -4},
    rotate: {z: -TAU / 8},
    stroke: 8
  });
  trailLock.copy({
    translate: {x: 3, z: -4},
    rotate: {z: TAU / 8},
    stroke: 8
  });
  trailLock.copy({
    translate: {y: 2},
    // rotate: { z: TAU/2 },
    scale: {y: 0.5},
    stroke: 8
  });
  // ----- torso ----- //

  // 2nd rib
  var torsoRib = new Zdog.Ellipse({
    width: 12,
    height: 10,
    addTo: body,
    rotate: {x: -TAU / 4},
    translate: {y: -1},
    stroke: 6,
    color: colors.parkaLight,
    fill: true
  });

  // neck rib
  torsoRib.copy({
    width: 6,
    height: 6,
    translate: {y: -5}
  });

  // 3rd rib
  torsoRib.copy({
    translate: {y: 3}
  });

  // 4th rib
  torsoRib.copy({
    translate: {y: 7},
    color: colors.parkaDark
  });

  // waist
  new Zdog.Ellipse({
    width: 10,
    height: 8,
    addTo: body,
    rotate: {x: -TAU / 4},
    translate: {y: 11},
    stroke: 4,
    color: colors.tight,
    fill: true
  });


  // arms
  [-1, 1].forEach(function (xSide) {
    var isLeft = xSide == 1;
    // shoulder ball
    new Zdog.Shape({
      addTo: body,
      stroke: 6,
      translate: {x: 6 * xSide, y: -5, z: -1},
      color: colors.parkaLight
    });


    var shoulderJoint = new Zdog.Anchor({
      addTo: body,
      translate: {x: 9 * xSide, y: -3, z: -2},
      rotate: isLeft ? {x: TAU / 8 * 3, z: -TAU / 32} : {z: TAU / 16 * 2, x: -TAU / 16 * 2}
    });


    // top shoulder rib
    var armRib = new Zdog.Ellipse({
      diameter: 2,
      rotate: {x: -TAU / 4},
      addTo: shoulderJoint,
      translate: {x: 0 * xSide},
      stroke: 6,
      color: colors.parkaLight,
      fill: true
    });

    armRib.copy({
      translate: {y: 4}
    });


    var elbowJoint = new Zdog.Anchor({
      addTo: shoulderJoint,
      translate: {y: 8},
      rotate: isLeft ? {} : {z: TAU / 8}
    });


    armRib.copy({
      addTo: elbowJoint,
      translate: {x: 0, y: 0}
    });

    armRib.copy({
      addTo: elbowJoint,
      translate: {y: 4},
      color: colors.parkaDark
    });


    // hand
    new Zdog.Shape({
      addTo: elbowJoint,
      translate: {y: 9, z: -1},
      stroke: 8,
      color: colors.skin
    });


    // ----- legs ----- //
    var knee = {y: 7};
    var thigh = new Zdog.Shape({
      path: [{y: 0}, knee],
      addTo: body,
      translate: {x: 4 * xSide, y: 13},
      rotate: isLeft ? {} : {x: TAU / 16 * 3, z: TAU / 16},
      stroke: 8,
      color: colors.tight
    });


    var shin = new Zdog.Shape({
      path: [{y: 0}, {y: 8}],
      addTo: thigh,
      stroke: 6,
      translate: knee,
      rotate: isLeft ? {} : {x: -TAU / 16 * 5},
      color: colors.tight
    });


  });

  // butt
  new Zdog.Shape({
    path: [
      {x: -3},
      {x: 3}],

    visible: false,
    addTo: body,
    translate: {y: 11, z: -2},
    stroke: 8,
    color: colors.tight
  });


}

window.makeBird = function (options) {

  var spin = options.spin || 0;

  var arrow = new Zdog.Anchor({
    addTo: options.addTo,
    scale: 2 / 3,
    rotate: {z: spin}
  });


  var bird = new Zdog.Group({
    addTo: arrow,
    translate: {x: 87},
    rotate: {x: -spin}
  });


  // bird body
  new Zdog.Shape({
    path: [
      {x: -3, y: 0},
      {
        arc: [
          {x: -2, y: 1.5},
          {x: 0, y: 1.5}]
      },

      {
        arc: [
          {x: 2, y: 1.5},
          {x: 2, y: 0}]
      }],


    addTo: bird,
    translate: {x: 0.5},
    stroke: 3,
    color: options.color,
    fill: true
  });


  // bird head
  new Zdog.Shape({
    translate: {x: 4, y: -1},
    addTo: bird,
    stroke: 4,
    color: options.color
  });


  // beak
  new Zdog.Shape({
    path: [
      {x: 0, y: -1},
      {x: 3, y: 0},
      {x: 0, y: 1}],

    addTo: bird,
    translate: {x: 5, y: -1},
    stroke: 1,
    color: options.color,
    fill: true
  });


  // tail feather
  new Zdog.Shape({
    path: [
      {x: -3, z: -2},
      {x: 0, z: 0},
      {x: -3, z: 2}],

    addTo: bird,
    translate: {x: -4, y: 0},
    stroke: 2,
    color: options.color,
    fill: true
  });


  var wing = new Zdog.Shape({
    path: [
      {x: 3, y: 0},
      {x: -1, y: -9},
      {
        arc: [
          {x: -5, y: -4},
          {x: -3, y: 0}]
      }],


    addTo: bird,
    translate: {z: -1.5},
    rotate: {x: TAU / 8},
    stroke: 1,
    color: options.color,
    fill: true
  });


  wing.copy({
    translate: {z: 1.5},
    scale: {z: -1},
    rotate: {x: -TAU / 8}
  });


};

// -------------------------- demo -------------------------- //

var illoElem = document.querySelector('.illo');
var w = 160;
var h = 160;
var minWindowSize = Math.min(window.innerWidth, window.innerHeight);
var zoom = Math.min(5, Math.floor(minWindowSize / w));
illoElem.setAttribute('width', w * zoom);
illoElem.setAttribute('height', h * zoom);

var isSpinning = true;
var TAU = Zdog.TAU;

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  rotate: {y: -TAU / 4},
  dragRotate: true,
  onDragStart: function () {
    isSpinning = false;
  }
});


var madColor = {
  skin: '#FD9',
  hair: '#D53',
  parkaLight: '#67F',
  parkaDark: '#35D',
  tight: '#742',
  eye: '#333'
};

var badColor = {
  skin: '#EBC',
  hair: '#D4B',
  parkaLight: '#85A',
  parkaDark: '#527',
  tight: '#412',
  eye: '#D02'
};


var glow = 'hsla(60, 100%, 80%, 0.3)';
var featherGold = '#FE5';

// -- illustration shapes --- //

makeMadeline(true, madColor, {
  addTo: illo
});

makeMadeline(false, badColor, {
  addTo: illo,
  rotate: {y: TAU / 2}
});


// ----- feather ----- //

var feather = new Zdog.Group({
  addTo: illo,
  rotate: {y: -TAU / 4}
});


(function () {

  var featherPartCount = 8;
  var radius = 12;
  var angleX = TAU / featherPartCount / 2;
  var sector = TAU * radius / 2 / featherPartCount;

  for (var i = 0; i < featherPartCount; i++) {
    var curve = Math.cos(i / featherPartCount * TAU * 3 / 4 + TAU * 1 / 4);
    var x = 4 - curve * 2;
    var y0 = sector / 2;
    // var y2 = -sector/2;
    var isLast = i == featherPartCount - 1;
    var y3 = isLast ? sector * -1 : -y0;
    var z1 = -radius + 2 + curve * -1.5;
    var z2 = isLast ? -radius : -radius;
    var barb = new Zdog.Shape({
      path: [
        {x: 0, y: y0, z: -radius},
        {x: x, y: -sector / 2, z: z1},
        {x: x, y: -sector * 3 / 4, z: z1},
        {x: 0, y: y3, z: z2}],

      addTo: feather,
      rotate: {x: angleX * -i + TAU / 8},
      stroke: 1,
      color: featherGold,
      fill: true
    });

    barb.copy({
      scale: {x: -1}
    });

  }

  // rachis
  var rachis = new Zdog.Ellipse({
    addTo: feather,
    diameter: radius * 2,
    quarters: 2,
    rotate: {y: -TAU / 4},
    stroke: 2,
    color: featherGold
  });

  rachis.copy({
    stroke: 8,
    color: glow,
    rotate: {y: -TAU / 4, x: -0.5}
  });

})();

// ----- rods ----- //

(function () {

  var rodCount = 14;
  for (var i = 0; i < rodCount; i++) {
    var zRotor = new Zdog.Anchor({
      addTo: illo,
      rotate: {z: TAU / rodCount * i}
    });


    var y0 = 32;
    var y1 = y0 + 2 + Math.random() * 24;
    new BokehShape({
      path: [
        {y: y0},
        {y: y1}],

      addTo: zRotor,
      rotate: {x: (Math.random() * 2 - 1) * TAU / 8},
      color: madColor.skin,
      stroke: 1,
      bokehSize: 6,
      bokehLimit: 70
    });

  }

})();

// dots

(function () {
  var dotCount = 64;

  for (var i = 0; i < dotCount; i++) {
    var yRotor = new Zdog.Anchor({
      addTo: illo,
      rotate: {y: TAU / dotCount * i}
    });


    new BokehShape({
      path: [
        {z: 40 * (1 - Math.random() * Math.random()) + 32}],

      addTo: yRotor,
      rotate: {x: (Math.random() * 2 - 1) * TAU * 3 / 16},
      color: badColor.skin,
      stroke: 1 + Math.random(),
      bokehSize: 6,
      bokehLimit: 74
    });

  }

})();

// ----- birds ----- //

var birdRotor = new Zdog.Anchor({
  addTo: illo,
  rotate: {y: TAU * -1 / 8}
});


makeBird({
  addTo: birdRotor,
  color: madColor.parkaLight,
  spin: TAU / 2
});


makeBird({
  addTo: birdRotor,
  color: featherGold,
  spin: -TAU * 3 / 8
});


makeBird({
  addTo: birdRotor,
  color: 'white',
  spin: -TAU / 4
});


makeBird({
  addTo: birdRotor,
  color: madColor.hair,
  spin: -TAU / 8
});


makeBird({
  addTo: birdRotor,
  color: madColor.parkaDark,
  spin: TAU / 8
});


// -- animate --- //

var isSpinning = true;
var rotateSpeed = -TAU / 60;
var xClock = 0;
var then = new Date() - 1 / 60;

function animate() {
  update();
  illo.renderGraph();
  requestAnimationFrame(animate);
}

animate();

// -- update -- //

function update() {
  var now = new Date();
  var delta = now - then;
  // auto rotate
  if (isSpinning) {
    var theta = rotateSpeed / 60 * delta * -1;
    illo.rotate.y += theta;
    xClock += theta / 4;
    illo.rotate.x = Math.sin(xClock) * TAU / 12;
  }

  illo.updateGraph();

  then = now;
}

//# sourceURL=pen.js
