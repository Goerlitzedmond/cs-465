const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            if (!json || !Array.isArray(json) || json.length === 0) {
                return res.status(404).json({ message: 'No trips found' });
            }
            res.render('travel', { title: 'Travlr Getaways', trips: json });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = { travel };