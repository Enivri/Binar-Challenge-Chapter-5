let carsRepositories = require('../repositories/cars.json')

class carService {
    static async getCars() {
        // Manggil repo get all books
        const getCars = await ccarsRepositories.getCars();

        return getBooks;
    }

    static async getBySize(id) {
        // Manggil repo get by id
        const getCarSize = await ccarsRepositories.getBySize(id);

        return getBook;
    }

    static async updateById(id, req) {
        // Manggil repo update by id
        const updateBook = await booksRepository.updateById(id, req);

        return updateBook;
    }

    static async deleteById(id) {
        // Manggil repo delete by id
        const deleteBook = await booksRepository.deleteById(id);

        return deleteBook;
    }

    static async getQuery(req) {
        // Manggil repo get all books
        const getQuery = await booksRepository.getQuery(req);

        return getQuery;
    }

    static async create({ title, author, price }) {
        const createdBook = await booksRepository.create({
            title,
            author,
            price,
        });

        return createdBook;
    }
}