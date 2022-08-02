const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route 		  	GET api/profile/me
// @desc		    Get current user's profile
// @access		  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route 		  	GET api/profile
// @desc		    Create/update user profile
// @access		  Private

router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills are required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			linkedin,
			instagram,
			twitter,
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;

		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		// Build socialmedia objects (so we can access socialmedia through profileFields.socialmedia.*insertmediahere*)
		profileFields.socialmedia = {};

		// Init profileFields.socialmedia.*everything*
		if (youtube) {
			profileFields.socialmedia.youtube = youtube;
		}
		if (facebook) {
			profileFields.socialmedia.facebook = facebook;
		}
		if (twitter) {
			profileFields.socialmedia.twitter = twitter;
		}
		if (linkedin) {
			profileFields.socialmedia.linkedin = linkedin;
		}
		if (instagram) {
			profileFields.socialmedia.instagram = instagram;
		}

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				// Update (if profile exists)
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}

			// Create (if profile does not exist)
			profile = new Profile(profileFields);
			await profile.save(); //save to MongoDB
			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
