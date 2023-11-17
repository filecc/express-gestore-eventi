function index (req, res) {
    res.send('Index');
}

function store (req, res) {
    res.send('Store');
}

function update (req, res) {
    res.send('Update');
}

module.exports = {
    index,
    store,
    update
}
