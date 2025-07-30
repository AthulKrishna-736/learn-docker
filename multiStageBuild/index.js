import express from 'express';

const app = express();
const port = 3000
const db = new Map();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('sample response');
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send('no data on req body')
    }

    const key = JSON.stringify(username);
    if (db.has(key)) {
        return res.send('alredy user registered');
    }

    db.set(key, password.trim());

    res.send('user registered successfully');
    res.end()
    res.redirect('/')
})

app.post('/', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send('no data on req body')
    }

    const key = JSON.stringify(username);
    if (!db.has(key)) {
        return res.send('No user found')
    }

    if (db.get(key) !== password.trim()) {
        return res.send('password does not match')
    }

    res.send('successfully logged in!!!!!');
    res.end();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
