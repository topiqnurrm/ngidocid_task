const Hapi = require('@hapi/hapi');
const { v4: uuidv4 } = require('uuid'); // Import UUID
const books = []; // Array untuk menyimpan buku

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    // Route GET /
    server.route({
        method: 'GET',
        path: '/',
        handler: () => {
            return { message: 'Server berjalan!' };
        },
    });

    // Route POST /books
    server.route({
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

            // Validasi: nama buku harus ada
            if (!name) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. Mohon isi nama buku',
                }).code(400);
            }

            // Validasi: readPage tidak boleh lebih besar dari pageCount
            if (readPage > pageCount) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
                }).code(400);
            }

            const id = uuidv4(); // Generate ID unik
            const finished = pageCount === readPage; // Status selesai
            const insertedAt = new Date().toISOString(); // Timestamp
            const updatedAt = insertedAt;

            // Buat objek buku baru
            const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt };
            books.push(newBook); // Tambahkan ke array books

            return h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            }).code(201);
        },
    });

    server.route({
        method: 'PUT',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const { bookId } = request.params;
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

            const index = books.findIndex((b) => b.id === bookId);

            if (index === -1) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. Id tidak ditemukan',
                }).code(404);
            }

            if (!name) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. Mohon isi nama buku',
                }).code(400);
            }

            if (readPage > pageCount) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
                }).code(400);
            }

            books[index] = {
                ...books[index],
                name, year, author, summary, publisher, pageCount, readPage, reading,
                updatedAt: new Date().toISOString(),
            };

            return {
                status: 'success',
                message: 'Buku berhasil diperbarui',
            };
        },
    });

    server.route({
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const { bookId } = request.params;
            const index = books.findIndex((b) => b.id === bookId);

            if (index === -1) {
                return h.response({
                    status: 'fail',
                    message: 'Buku tidak ditemukan',
                }).code(404);
            }

            books.splice(index, 1);
            return {
                status: 'success',
                message: 'Buku berhasil dihapus',
            };
        },
    });

    server.route({
        method: 'GET',
        path: '/books',
        handler: () => {
            const result = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
            return { status: 'success', data: { books: result } };
        },
    });

    server.route({
        method: 'GET',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const { bookId } = request.params;
            const book = books.find((b) => b.id === bookId);
            if (!book) {
                return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
            }
            return { status: 'success', data: { book } };
        },
    });

    // Start server
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// Tangani error yang tidak tertangani
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
