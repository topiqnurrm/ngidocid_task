/**
 * Class Inventory manages a collection of items.
 * - Property:
 *   - items: An array to store item objects.
 * - Methods:
 *   - addItem: Adds an item to the inventory.
 *   - removeItem: Removes an item from the inventory by its ID.
 *   - listItems: Returns a string of all item details in the inventory.
 */
class Inventory {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  listItems() {
    return this.items.map(item => item.displayDetails()).join('\n');
  }
}

// Jangan hapus kode di bawah ini!
export default Inventory;
