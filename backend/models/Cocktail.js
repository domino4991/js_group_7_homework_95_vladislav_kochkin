const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cocktailName: {
        type: String,
        required: [true, 'Поле "Название" обязательно для заполнения']
    },
    cocktailImage: {
        type: String,
        default: 'no_image_available.jpg'
    },
    recipe: {
        type: String,
        required: [true, 'Поле "Рецепт" обязательно для заполнения']
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    ingredients: [{
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Должен быть добавлен хотя бы 1 ингредиент']
    }]
}, {
    versionKey: false
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;