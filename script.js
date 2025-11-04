$(document).ready(function() {
  let modal = $(".birthday_inner__modal");
  let audio = $("#bgm")[0];

  $(".add, .startagain").hide();

  $(".gift-container").click(function() {
    $(this).fadeOut(300, () => {
      $(".birthday").fadeIn(500);
      audio.volume = 1;
      audio.play();
    });
  });

  audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

  $("#music-control").click(function() {
    if (audio.muted) {
      audio.muted = false;
      $(this).html('<i class="fas fa-volume-up"></i>');
    } else {
      audio.muted = true;
      $(this).html('<i class="fas fa-volume-mute"></i>');
    }
  });

  $(".start").click(() => {
    modal.find("h1").text("To my amazing sister...");
    modal.find("p").text("You mean more to me than you'll ever know. Thank you for being you. Today, we celebrate you!");
    modal.find("img").attr("src", "images/pihu2.jpg");
    modal.css("transform", "translateY(-50%) scale(1)");
  });

  $(".birthday_inner__modal button").click(function() {
    modal.css("transform", "translateY(-50%) scale(0)");
    if ($(".stage1").is(":visible")) {
      $(".stage1").hide();
      $(".stage2").fadeIn();
    }
  });

  let mixing = false;
  let mixtimes = 0;
  $(".mixer").click(() => {
    if (!mixing) {
      mixing = true;
      mixtimes++;
      $(".mix_spoon").addClass("move");
      setTimeout(() => {
        $(".mix_spoon").removeClass("move");
        mixing = false;
      }, 1000);
    }
    if (mixtimes == 5) {
      $(".stage2").fadeOut(500);
      setTimeout(() => {
        modal.find("h1").text("Perfectly Mixed!");
        modal.find("p").text("Just like our bond, it's the perfect mix of fun, love, and a little bit of craziness.");
        modal.find("img").attr("src", "images/pihu3.jpg");
        modal.css("transform", "translateY(-50%) scale(1)");
      }, 500);
      setTimeout(() => modal.css("transform","translateY(-50%) scale(0)"), 3000);
      setTimeout(() => $(".stage3").fadeIn(), 3300);
    }
  });

  $(".tin").draggable({ revert: true });
  $(".oven").droppable({
    drop: () => {
      $(".stage3").fadeOut(500);
      setTimeout(() => {
        modal.find("h1").html("Baked with Love ❤️");
        modal.find("p").html("Now, let's decorate it the same way you decorate everyone's life with your beautiful smile.");
        modal.find("img").attr("src", "images/pihu4.jpg");
        modal.css("transform", "translateY(-50%) scale(1)");
      }, 500);
      setTimeout(() => modal.css("transform","translateY(-50%) scale(0)"), 3000);
      setTimeout(() => $(".stage4").fadeIn(), 3300);
    }
  });

  let bases = 0;
  let fillings = 0;

  $(".sponges .item_inner").click(function () {
    if (bases >= 5) return;
    $(".sponges").addClass("inactive");
    $(".fillings").removeClass("inactive");
    let type = $(this).attr("class").split(" ").pop();
    bases++;
    $(".cakemake").prepend(`<div class="sponge sponge-${type}" style="width:${200 - bases * 20}px"></div>`);
    $(".sponges span").text(bases);
  });

  $(".fillings .item_inner").click(function () {
    if (fillings >= 6) return;
    let type = $(this).attr("class").split(" ").pop();
    fillings++;
    $(".cakemake").prepend(`<div class="filling filling-${type}" style="width:${200 - bases * 20}px"></div>`);
    $(".fillings span").text(fillings);
    if (fillings >= 6) {
      $(".options").fadeOut(300);
      $(".add, .startagain").fadeIn(300);
    } else {
      $(".fillings").addClass("inactive");
      $(".sponges").removeClass("inactive");
    }
  });

  $(".startagain").click(() => {
    $(".cakemake").html(`<div class="base"></div>`);
    bases = 0;
    fillings = 0;
    $(".sponges span").text(0);
    $(".fillings span").text(0);
    $(".add, .startagain").fadeOut(300);
    $(".options").fadeIn(300);
    $(".fillings").addClass("inactive");
    $(".sponges").removeClass("inactive");
  });

  $(".add").click(() => {
    $(".options, .add, .startagain").fadeOut(300);
    $(".birthday_inner__stage.stage4 h1").text("Your cake is ready!");
    $(".birthday_inner__stage.stage4 h2").text("Click the flame to make a wish!");
    setTimeout(() => {
      $(".cakemake").prepend(`<div class="candle"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/candle.png"><div class="flame"></div></div>`);
      $(".flame").css('cursor', 'pointer');
    }, 300);
    setTimeout(() => {
      $(".flame").addClass("in");
    }, 800);
    $(document).one('click', '.flame', function() {
      $(this).fadeOut(300);
      let fade = setInterval(() => {
        audio.volume = Math.max(0, audio.volume - 0.05);
        if (audio.volume <= 0) clearInterval(fade);
      }, 150);
      setTimeout(() => {
        $(".birthday").fadeOut(500, function() {
          $(".final_screen").fadeIn(500, function() {
            spawnBalloons();
          });
        });
        let duration = 5000;
        let animationEnd = Date.now() + duration;
        let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 101, colors: ['#52327D', '#F8BBD0', '#E1BEE7', '#FFFFFF'] };
        function randomInRange(min, max) { return Math.random() * (max - min) + min; }
        let interval = setInterval(function() {
          let timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) { return clearInterval(interval); }
          let particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
        $('.slideshow .slide').each(function(i) {
          setTimeout(() => {
            $(this).show().css('animation-delay', `${i * 0.2}s`);
          }, 500);
        });
      }, 2000);
    });
  });

  $("#replay").on('click', function() {
    location.reload();
  });

  function spawnBalloons() {
    let box = $('.balloons');
    box.empty();
    for (let i = 0; i < 14; i++) {
      let left = Math.random() * 100;
      let size = 22 + Math.random() * 16;
      let dur = 7 + Math.random() * 5;
      let hue = Math.floor(300 + Math.random() * 60);
      let b = $(`<div class="balloon"></div>`);
      b.css({
        left: `${left}%`,
        width: `${size}px`,
        height: `${size * 1.3}px`,
        background: `hsl(${hue},70%,75%)`,
        '--dur': `${dur}s`
      });
      box.append(b);
    }
  }
});
