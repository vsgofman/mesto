export default class Section {
  constructor(renderer , containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    if (Array.isArray(items)) {
      items.forEach(item => this._renderer(item)
      );
    } else {
      [items].forEach(item => this._renderer(item)
      );
    }
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
