import bcrypt from 'bcryptjs';

const users = [
    {
        name:"Admin user",
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name:"Vikrant kale",
        email: 'vikrant@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name:"Vicky 2",
        email: 'vicky@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default users;