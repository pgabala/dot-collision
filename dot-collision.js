  var dotCollisionCanvas = document.getElementById("dot-collision");
  var canvasContext = dotCollisionCanvas.getContext("2d");
  canvasContext.globalAlpha = .5;
  var canvasWidth = dotCollisionCanvas.width;
  var canvasHeight = dotCollisionCanvas.height;
  var isAnimationPaused = false;
  var radius = 5;
  var nodeAmount = 30;
  var minSpeed = .2;
  var maxSpeed = .4;
  var nodes = [];

  function init() {
      for (var i = 0; i < nodeAmount; i++) {
          var xLocation = setStart(radius, canvasWidth);
          var yLocation = setStart(radius, canvasHeight);
          var xSpeed = setStart(minSpeed, maxSpeed) * setDirection();
          var ySpeed = setStart(minSpeed, maxSpeed) * setDirection();

          nodes[i] = {
              x: xLocation,
              y: yLocation,
              xSpeed: xSpeed,
              ySpeed: ySpeed
          };

          fillNode(xLocation, yLocation);
      }
  }

  function setStart(min, max) {
      return Math.random() * (max - min) + min;
  }

  function setDirection() {
      return Math.floor(Math.random() * 2) === 0 ? -1 : 1;
  }

  function fillNode(x, y) {
      var glow = null;

      canvasContext.beginPath();
      canvasContext.arc(x, y, radius, 0, 2 * Math.PI);

      glow = canvasContext.createRadialGradient(x, y, radius * 2, x + 1, y + 1, 2.5);
      glow.addColorStop(1, "grey");
      glow.addColorStop(0, "white");

      canvasContext.fillStyle = glow;
      canvasContext.shadowBlur = 20;
      canvasContext.shadowColor = "#005580";
      canvasContext.fill();
  }

  function connnectNodes(x, y) {
      nodes.forEach(function(node) {
          canvasContext.arc(x, y, radius * 20, 0, 2 * Math.PI);

          if (canvasContext.isPointInPath(node.x, node.y, "nonzero")) {
              canvasContext.beginPath();
              canvasContext.moveTo(x, y);
              canvasContext.lineTo(node.x, node.y);
              canvasContext.strokeStyle = "grey";
              canvasContext.stroke();
          }
      });

  }

  function animateNodes() {
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      nodes.forEach(function(node) {
          node.x += node.xSpeed;
          node.y += node.ySpeed;

          if (node.x <= 0 || node.x >= canvasWidth) {
              node.xSpeed = -node.xSpeed;
          }

          if (node.y <= 0 || node.y >= canvasHeight) {
              node.ySpeed = -node.ySpeed;
          }

          fillNode(node.x, node.y);
          connnectNodes(node.x, node.y);
      });

      if (!isAnimationPaused) {
          window.requestAnimationFrame(animateNodes);
      }
  }

  dotCollisionCanvas.addEventListener('click', function(event) {
      if (isAnimationPaused === true) {
          isAnimationPaused = false;
          window.requestAnimationFrame(animateNodes);
      } else {
          isAnimationPaused = true;
      }
  });

  init();
  window.requestAnimationFrame(animateNodes);