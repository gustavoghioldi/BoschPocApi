var TallerModel          = require('../models/TallerModel');
var cors = require('cors');

function init (router){
	router.route('/talleres')

		.post(cors(),function(req, res) {
			var taller = new TallerModel();      // create a new instance of the taller model
			taller.name = req.body.name;  // set the tallers name (comes from the request)
		  taller.direccion = req.body.direccion;
			// save the taller and check for errors
			taller.save(function(err, result) {
				if (err)
					res.send(err);
				res.json(result);
			});

		}).get(cors(),function(req, res) {
			TallerModel.find(function (err, tallers) {
				if (err)
					res.send(err);
				res.json(tallers);
			})
		})

		.options(cors(),function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

	router.route('/talleres/:id')

		.get(cors(),function(req, res) {
			TallerModel.findById(req.params.id, function (err, taller) {
				if (err)
					res.send(err);
				res.json(taller);
			})
		})

		.delete(cors(),function(req, res) {
			TallerModel.findByIdAndRemove(req.params.id, function (err, taller) {
				if (err)
					res.send(err);
				res.json(taller);
			})
		})
		.put(cors(),function(req, res) {
			TallerModel.findById(req.params.id, function (err, taller) {
			  if (err) res.send(err);
				taller.name = req.body.name;  // set the tallers name (comes from the request)
			  taller.direccion = req.body.direccion;
				console.log(taller);
			  taller.save(function (err) {
			    if (err){
						console.log(err);
						res.json(err);

					}
			    res.json(taller);
			  });
			})
		})

		.options(cors(),function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

}
module.exports = {
	init : init
}