function fibonacci(n) {
    if (n === 0) {
        return 0; // Base case
    }
    if (n === 1) {
        return 1; // Base case
    }
    return fibonacci(n - 1) + fibonacci(n - 2); // Recursive case
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
