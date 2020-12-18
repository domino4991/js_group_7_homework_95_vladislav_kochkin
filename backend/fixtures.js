const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');


mongoose.connect(config.database, config.databaseOpt);


const db = mongoose.connection;

db.once('open', async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        for(let collItem of collections) {
            await db.dropCollection(collItem.name);
        }
        const admin = await User.create({
            username: 'admin',
            password: 'testpass',
            role: 'admin',
            token: nanoid(),
            displayName: 'Admin Adminovich'
        });
        await Cocktail.create({
            user: admin,
            cocktailName: 'Test',
            recipe: 'Test recipe for Test',
            isPublished: true,
            ingredients: [
                {ingName: 'Test', ingAmount: '10ml'},
                {ingName: 'Test 2', ingAmount: '12ml'},
                {ingName: 'Test 3', ingAmount: '5ml'}
            ]
        }, {
            user: admin,
            cocktailName: 'Test 2',
            recipe: 'Test recipe for Test 2',
            isPublished: false,
            ingredients: [
                {ingName: 'Test', ingAmount: '10ml'},
                {ingName: 'Test 2', ingAmount: '12ml'},
                {ingName: 'Test 3', ingAmount: '5ml'}
            ]
        }, {
            user: admin,
            cocktailName: 'Test 3',
            recipe: 'Test recipe for Test 3',
            isPublished: true,
            ingredients: [
                {ingName: 'Test', ingAmount: '10ml'},
                {ingName: 'Test 2', ingAmount: '12ml'},
                {ingName: 'Test 3', ingAmount: '5ml'}
            ]
        });
    } catch (e) {
        console.log(e);
    }
    await db.close();
});


