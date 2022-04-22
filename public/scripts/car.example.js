class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
    withDriver
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
    this.withDriver = withDriver
  }

  render() {
    return `
    <img src="${this.image}" class="card-img-top">
    <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="">${this.manufacture}/${this.model}</h5>
        <h3 class="fw-bold">Rp ${this.rentPerDay.toLocaleString()}/ hari</h3>
        <p class="card-text">${this.description}</p>
        <ul class="fa-ul liststyle reset-padding">
            <li class=" d-flex"><span class="fa-li init"><img src="./images/user_card.png"
                        class="size-check"></span>
                <p class="mrg-15">${this.capacity} orang</p>
            </li>
            <li class=" d-flex"><span class="fa-li init"><img src="./images/gear_card.png"
                        class="size-check"></span>
                <p class="mrg-15">${this.transmission}</p>
            </li>
            <li class=" d-flex"><span class="fa-li init"><img src="./images/calendar_card.png"
                        class="size-check"></span>
                <p class="mrg-15">Tahun ${this.year}</p>
            </li>
        </ul>
        <a href="#" class="btn btn-success bg-limegreen fw-bold width-100">Pilih Mobil</a>
    </div>
    `;
  }
}
