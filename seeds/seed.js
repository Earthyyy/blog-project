const { faker } = require('@faker-js/faker');
const prisma = require('../database/index');
const {
    shuffleArray
} = require('../utils/utils')

async function resetTables() {
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
}

async function createUsers(range) {
    for (let i = 0 ; i < range ; i++) {
        await prisma.user.create({
            data: {
                id: i + 1,
                username : faker.name.firstName(),
                email : faker.internet.email(),
                password : faker.internet.password(),
                role : 'USER'
            }
        });
    }
}

async function createAdmin() {
    await prisma.user.create({
        data: {
            id: 11,
            username : faker.name.firstName(),
            email : faker.internet.email(),
            password : faker.internet.password(),
            role : 'ADMIN'
        }
    })
}


async function createCategories(range) {
    for (let i = 0 ; i < range ; i++) {
        await prisma.category.create({
            data: {
                id: i + 1,
                name: faker.commerce.department()
            }
        });
    }
}


async function createArticles(range) {
    const idx = [...Array(10).keys()];
    for (let i = 1 ; i < range + 1 ; i++) {
        const categoryArray = [];
        shuffleArray(idx);
        let rndInt = Math.floor(Math.random() * 4 + 1);
        let userId = Math.floor(Math.random() * 10 + 1);
        for (let j = 0 ; j < rndInt ; j++) categoryArray.push(idx[j] + 1);

        await prisma.article.create({
            data: {
                id: i,
                title: faker.lorem.word(4),
                content: faker.lorem.paragraph(5),
                image: faker.internet.url(),
                isPublished: true,
                userId,
                categories: {
                    connect: categoryArray.map(item => {
                        return {
                            id: item
                        }
                    })
                }
            }
        });
    }
}

async function createComments(range,articleNum) {
    for (let i = 1 ; i < articleNum + 1; i++ ) {
        let rndInt = Math.floor(Math.random() * (range + 1));
        let userId = Math.floor(Math.random() * 10 + 1);
        for (let j = 0 ; j < rndInt ; j++) {
            await prisma.comment.create({
                data: {
                    content: faker.lorem.sentence(20),
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    article: {
                        connect: {
                            id: i
                        }
                    }
                }
            });
        }
    }
}


async function main() {
    console.log('Deleting all records...');
    await resetTables();
    console.log('Records deleted successfully!');
    console.log('Adding 10 users...');
    await createUsers(10);
    console.log('Users added successfully!');
    console.log('Adding an admin...');
    await createAdmin();
    console.log('Admin added successfully!');
    console.log('Adding 10 categories...');
    await createCategories(10);
    console.log('Categories added Successfully!');
    console.log('Adding 100 articles...');
    await createArticles(100);
    console.log('Articles added successfully!');
    console.log('Adding comments...');
    await createComments(20,100)
    console.log('Comments added successfully!');
}


main();