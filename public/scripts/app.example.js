class App {
  static filterer = {}
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");

    this.inputDriver = document.querySelector(".form.driver");
    this.driverOpen = document.querySelector(".position-options.driver");

    this.inputTime = document.querySelector(".form.time");
    this.timeOpen = document.querySelector(".position-options.time");

    this.inputPassenger = document.querySelector(".form.passenger");
    this.passengerOpen = document.querySelector(".position-options.passenger");

    this.driverChoice = document.querySelectorAll(".tipe-driver.driver");
    this.timeChoice = document.querySelectorAll(".tipe-driver.time");

    this.passengerChoice = document.querySelectorAll(".tipe-driver.passenger");
    this.container = document.querySelector(".pop-up");

    this.inputDate = document.querySelector(".form.date")
    this.dateOptions = document.querySelector(".form.date-absolute")

    this.cariMobil = document.querySelector(".cari-mobil")
  }


  async init() {
    await this.load();
    this.inputDriver.value = App.filterer.type
    this.inputTime.value = App.filterer.time
    this.inputPassenger.value = App.filterer.passenger
    this.inputDate.value = App.filterer.date
    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;
    this.inputDriver.onclick = () => this.openOptions("driver");
    this.inputTime.onclick = () => this.openOptions("time");
    this.inputPassenger.onclick = () => this.openOptions("passenger");
    this.driverChoice.forEach(options => { options.onclick = (e) => this.saveData(e, "driver"); })
    this.timeChoice.forEach(options => { options.onclick = (e) => this.saveData(e, "time"); })
    this.passengerChoice.forEach(options => { options.onclick = (e) => this.saveData(e, "passenger"); })
    window.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) { this.closeOptions() }
    }, true)
    this.inputDate.onclick = () => this.openOptions("date")
    this.dateOptions.onchange = (e) => this.saveData(e, "date");
    this.cariMobil.onclick = () => this.redirect()

  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.className = "card"
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars(this.filtering);
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };

  openOptions = (target) => {
    this.closeOptions()
    this.container.classList.add("selected")
    if (target === "driver") {
      this.driverOpen.classList.add("position-options-show")
    }
    else if (target === "time") {
      this.timeOpen.classList.add("position-options-show")
    }
    else if (target === "passenger") {
      this.passengerOpen.classList.add("position-options-show")
    }
    else if (target === "date") {
      this.dateOptions.showPicker()
    }
  }

  closeOptions = () => {
    this.driverOpen.classList.remove("position-options-show")
    this.timeOpen.classList.remove("position-options-show")
    this.passengerOpen.classList.remove("position-options-show")
    this.container.classList.remove("selected")
  }

  saveData = (e, target) => {
    console.log(e, target)
    if (target === "driver") {
      this.inputDriver.value = e.currentTarget.textContent.trim()
    }
    else if (target === "time") {
      this.inputTime.value = e.currentTarget.textContent.trim()
    }
    else if (target === "passenger") {
      this.inputPassenger.value = e.currentTarget.textContent.trim()
    }
    else if (target === "date") {
      this.inputDate.value = e.currentTarget.value.trim()
    }
    this.closeOptions()
  }

  filtering(car) {
    const { withDriver, availableAt, capacity } = car
    let { type, date, time, passenger } = App.filterer
    type = type === "Dengan Sopir"
    time = time.replace("WIB", "").trim()
    passenger = passenger.replace("orang", "").trim()

    const dataAvailableAt = new Date(availableAt).getTime()
    const filterAvailableAt = new Date(`${date} ${time}`).getTime()

    car = (
      type === withDriver
      && dataAvailableAt>= filterAvailableAt
    ) ? car : false

    if (!car) return false
    
    if (passenger){
      car = (capacity >= passenger) ? car : false
    }
    return car
  }

  redirect = () => {
    location.href = window.location.pathname + `?type=${this.inputDriver.value}&date=${this.inputDate.value}&time=${this.inputTime.value}&passenger=${this.inputPassenger.value}`;
  }

}