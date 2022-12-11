export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._iniialCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._iniialCards.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
