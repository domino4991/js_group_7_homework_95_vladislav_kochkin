const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Поле "Логин" должно быть заполнено'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Поле "Пароль" должно быть заполнено']
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    displayName: {
        type: String,
        required: [true, 'Поле "Имя" должно быть заполнено']
    },
    avatar: {
        type: String,
    },
    facebookId: {
        type: String
    }
}, {
    versionKey: false
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (e) {
        return next(e);
    }
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPass = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.genToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;