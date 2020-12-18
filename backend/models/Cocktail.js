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
    ingredients: {
        type: Array,
        required: true,
        validate : {
            validator : function(array) {
                if(array.length === 0) {
                    return false;
                }
            },
            message: 'Должен быть добавлен хотя бы 1 ингредиент'
        }
    },
    rating: [{
        type: mongoose.Schema.Types.Mixed
    }]
}, {
    versionKey: false
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;