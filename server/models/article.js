const mongoose = require('mongoose'),
	Schema = mongoose.Schema; 


const articleSchema = new Schema({ //maps to db content
	title: String,
	content: String
});


module.exports = mongoose.model('article', articleSchema);  //require into routes/api



