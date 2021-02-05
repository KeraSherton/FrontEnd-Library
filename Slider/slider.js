class Slider {
  constructor(images) {
    this.images = images;
    this.slide = null;
    this.nextBtn = null;
    this.prevBtn = null;
    this.image = null;
    this.currentSlide = 0;

    this.xDown = null;
    this.yDown = null;

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.UiSelectors = {
      slide: "[data-slide]",
      buttonPrev: "[data-button-prev]",
      buttonNext: "[data-button-next]",
    };
  }

  initSlider() {
    this.slide = document.querySelector(this.UiSelectors.slide);
    this.prevBtn = document.querySelector(this.UiSelectors.buttonPrev);
    this.nextBtn = document.querySelector(this.UiSelectors.buttonNext);
    this.image = document.createElement("img");
    this.image.classList.add("slide__image");
    this.setSlideAtrributes(this.currentSlide);

    this.slide.appendChild(this.image);
    this.addListeners();
    this.disableButtons();

    this.slide.addEventListener("touchstart", this.handleTouchStart, false);
    this.slide.addEventListener("touchmove", this.handleTouchMove, false);
  }

  addListeners() {
    this.prevBtn.addEventListener("click", () =>
      this.changeSlide(this.currentSlide - 1)
    );
    this.nextBtn.addEventListener("click", () =>
      this.changeSlide(this.currentSlide + 1)
    );
  }

  disableButtons() {
    this.currentSlide == 0
      ? this.prevBtn.setAttribute("disabled", true)
      : this.prevBtn.removeAttribute("disabled");
    this.currentSlide == this.images.length - 1
      ? this.nextBtn.setAttribute("disabled", true)
      : this.nextBtn.removeAttribute("disabled");
  }

  changeSlide(index) {
    this.currentSlide = index;
    this.setSlideAtrributes(index);
    this.disableButtons();
  }

  setSlideAtrributes(index) {
    this.image.setAttribute("src", this.images[index]);
    this.image.setAttribute("alt", `Slide nr ${index + 1}`);
  }

  onLeft() {
    if (this.currentSlide == this.images.length - 1) {
      return;
    } else {
      this.changeSlide(this.currentSlide + 1);
    }
  }

  onRight() {
    if (this.currentSlide == 0) {
      return;
    } else {
      this.changeSlide(this.currentSlide - 1);
    }
  }

  onUp() {
    this.options.onUp();
  }

  onDown() {
    this.options.onDown();
  }

  handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0 && this.onLeft) {
        /* left swipe */
        this.onLeft();
      } else if (this.onRight) {
        /* right swipe */
        this.onRight();
      }
    } else {
      if (yDiff > 0 && this.onUp) {
        /* up swipe */
        this.onUp();
      } else if (this.onDown) {
        /* down swipe */
        this.onDown();
      }
    }

    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }
}

// class Swipe {
//   constructor() {
//     this.xDown = null;
//     this.yDown = null;

//     this.handleTouchStart = this.handleTouchStart.bind(this);
//     this.handleTouchMove = this.handleTouchMove.bind(this);
//     this.UiSelectors = {
//       slide: "[data-slide]",
//     };
//   }

//   initSwipe() {
//     this.slide = document.querySelector(this.UiSelectors.slide);
//     this.slide.addEventListener("touchstart", this.handleTouchStart, false);
//     this.slide.addEventListener("touchmove", this.handleTouchMove, false);
//   }

//   onLeft() {
//     console.log("You swiped left.");
//   }

//   onRight() {
//     console.log("You swiped right.");
//   }

//   onUp() {
//     this.options.onUp();
//   }

//   onDown() {
//     this.options.onDown();
//   }

//   static getTouches(evt) {
//     return evt.touches; // browser API
//   }

//   handleTouchStart(evt) {
//     const firstTouch = Swipe.getTouches(evt)[0];
//     this.xDown = firstTouch.clientX;
//     this.yDown = firstTouch.clientY;
//   }

//   handleTouchMove(evt) {
//     if (!this.xDown || !this.yDown) {
//       return;
//     }

//     let xUp = evt.touches[0].clientX;
//     let yUp = evt.touches[0].clientY;

//     let xDiff = this.xDown - xUp;
//     let yDiff = this.yDown - yUp;

//     if (Math.abs(xDiff) > Math.abs(yDiff)) {
//       /*most significant*/
//       if (xDiff > 0 && this.onLeft) {
//         /* left swipe */
//         this.onLeft();
//       } else if (this.onRight) {
//         /* right swipe */
//         this.onRight();
//       }
//     } else {
//       if (yDiff > 0 && this.onUp) {
//         /* up swipe */
//         this.onUp();
//       } else if (this.onDown) {
//         /* down swipe */
//         this.onDown();
//       }
//     }

//     /* reset values */
//     this.xDown = null;
//     this.yDown = null;
//   }
// }
