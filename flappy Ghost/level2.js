//gravitasi dan speed
let move_speed = 12,
  grativy = 0.5;
let ghost = document.querySelector(".ghost");
let img = document.getElementById("ghost-1");
let sound_point = new Audio("sounds effect/point.mp3");
let sound_die = new Audio("sounds effect/die.mp3");

// getting ghost element properties
let ghost_props = ghost.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector(".background").getBoundingClientRect();

//score
let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    ghost.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
    play();
  }
});

function play() {
  function move() {
    if (game_state != "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      ghost_props = ghost.getBoundingClientRect();

      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          ghost_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
          ghost_props.left + ghost_props.width > pipe_sprite_props.left &&
          ghost_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          ghost_props.top + ghost_props.height > pipe_sprite_props.top
        ) {
          game_state = "End";
          message.innerHTML =
            "Game Over".fontcolor("red") +
            "<br>Tekan Enter Untuk Memulai Ulang";
          message.classList.add("messageStyle");
          img.style.display = "none";
          sound_die.play();
          return;
        } else {
          if (
            pipe_sprite_props.right < ghost_props.left &&
            pipe_sprite_props.right + move_speed >= ghost_props.left &&
            element.increase_score == "1"
          ) {
            let score = +score_val.innerHTML + 1;
            score_val.innerHTML = score;
            // sound_point.play();
            // untuk finish dan memberi batas score
            if (score > 15) {
              alert("selesai");
              // window.location.reload();
              window.location.href = "level3.html";
            }
          }
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let ghost_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    ghost_dy = ghost_dy + grativy;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        img.src = "img/hantu.png";
        ghost_dy = -8.0;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        img.src = "img/hantu.png";
      }
    });

    if (ghost_props.top <= 0 || ghost_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      window.location.reload();
      message.classList.remove("messageStyle");
      return;
    }
    ghost.style.top = ghost_props.top + ghost_dy + "px";
    ghost_props = ghost.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  let pipe_gap = 35;

  function create_pipe() {
    if (game_state != "Play") return;

    if (pipe_seperation > 55) {
      pipe_seperation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.className = "pipe_sprite";
      pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
