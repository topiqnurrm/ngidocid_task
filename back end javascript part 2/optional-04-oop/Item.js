/**
 * Class Item represents an inventory item.
 * - Properties: id (number), name (string), quantity (number), price (number).
 * - Methods:
 *   - updateDetails: Updates name, quantity, and price.
 *   - displayDetails: Returns item details in a formatted string.
 */
class Item {
  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  updateDetails(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  displayDetails() {
    return `ID: ${this.id}, Name: ${this.name}, Quantity: ${this.quantity}, Price: ${this.price}`;
  }
}

// Jangan hapus kode di bawah ini!
export default Item;
