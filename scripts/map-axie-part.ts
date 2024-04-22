const PARTS = [
	{
		special_genes: null,
		name: 'Zeal',
		ability_id: 'beast-eyes-02',
	},
	{
		special_genes: 'mystic',
		name: 'Calico Zeal',
		ability_id: 'beast-eyes-02',
	},
	{
		special_genes: null,
		name: 'Little Peas',
		ability_id: 'beast-eyes-04',
	},
	{
		special_genes: 'xmas',
		name: 'Snowflakes',
		ability_id: 'beast-eyes-04',
	},
	{
		special_genes: null,
		name: 'Puppy',
		ability_id: 'beast-eyes-08',
	},
	{
		special_genes: null,
		name: 'Chubby',
		ability_id: 'beast-eyes-10',
	},
	{
		special_genes: null,
		name: 'Nyan',
		ability_id: 'beast-ears-02',
	},
	{
		special_genes: 'mystic',
		name: 'Pointy Nyan',
		ability_id: 'beast-ears-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Coca',
		ability_id: 'beast-ears-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Coca Shiny',
		ability_id: 'beast-ears-02',
	},
	{
		special_genes: null,
		name: 'Nut Cracker',
		ability_id: 'beast-ears-04',
	},
	{
		special_genes: null,
		name: 'Innocent Lamb',
		ability_id: 'beast-ears-06',
	},
	{
		special_genes: 'xmas',
		name: 'Merry Lamb',
		ability_id: 'beast-ears-06',
	},
	{
		special_genes: null,
		name: 'Zen',
		ability_id: 'beast-ears-08',
	},
	{
		special_genes: null,
		name: 'Puppy',
		ability_id: 'beast-ears-10',
	},
	{
		special_genes: null,
		name: 'Belieber',
		ability_id: 'beast-ears-12',
	},
	{
		special_genes: null,
		name: 'Ronin',
		ability_id: 'beast-back-02',
	},
	{
		special_genes: 'mystic',
		name: 'Hasagi',
		ability_id: 'beast-back-02',
	},
	{
		special_genes: null,
		name: 'Hero',
		ability_id: 'beast-back-04',
	},
	{
		special_genes: null,
		name: 'Jaguar',
		ability_id: 'beast-back-06',
	},
	{
		special_genes: null,
		name: 'Risky Beast',
		ability_id: 'beast-back-08',
	},
	{
		special_genes: 'japan',
		name: 'Hamaya',
		ability_id: 'beast-back-08',
	},
	{
		special_genes: null,
		name: 'Timber',
		ability_id: 'beast-back-10',
	},
	{
		special_genes: null,
		name: 'Furball',
		ability_id: 'beast-back-12',
	},
	{
		special_genes: 'summer-2022',
		name: 'Beach Ball',
		ability_id: 'beast-back-12',
	},
	{
		special_genes: 'summer-2022',
		name: 'Beach Ball Shiny',
		ability_id: 'beast-back-12',
	},
	{
		special_genes: null,
		name: 'Little Branch',
		ability_id: 'beast-horn-02',
	},
	{
		special_genes: 'mystic',
		name: 'Winter Branch',
		ability_id: 'beast-horn-02',
	},
	{
		special_genes: null,
		name: 'Imp',
		ability_id: 'beast-horn-04',
	},
	{
		special_genes: 'japan',
		name: 'Kendama',
		ability_id: 'beast-horn-04',
	},
	{
		special_genes: null,
		name: 'Merry',
		ability_id: 'beast-horn-06',
	},
	{
		special_genes: null,
		name: 'Pocky',
		ability_id: 'beast-horn-08',
	},
	{
		special_genes: 'japan',
		name: 'Umaibo',
		ability_id: 'beast-horn-08',
	},
	{
		special_genes: null,
		name: 'Dual Blade',
		ability_id: 'beast-horn-10',
	},
	{
		special_genes: null,
		name: 'Arco',
		ability_id: 'beast-horn-12',
	},
	{
		special_genes: null,
		name: 'Cottontail',
		ability_id: 'beast-tail-02',
	},
	{
		special_genes: 'mystic',
		name: 'Sakura Cottontail',
		ability_id: 'beast-tail-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Cotton Candy',
		ability_id: 'beast-tail-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Cotton Candy Shiny',
		ability_id: 'beast-tail-02',
	},
	{
		special_genes: null,
		name: 'Rice',
		ability_id: 'beast-tail-04',
	},
	{
		special_genes: null,
		name: 'Shiba',
		ability_id: 'beast-tail-06',
	},
	{
		special_genes: null,
		name: 'Hare',
		ability_id: 'beast-tail-08',
	},
	{
		special_genes: null,
		name: 'Nut Cracker',
		ability_id: 'beast-tail-10',
	},
	{
		special_genes: null,
		name: 'Gerbil',
		ability_id: 'beast-tail-12',
	},
	{
		special_genes: null,
		name: 'Nut Cracker',
		ability_id: 'beast-mouth-02',
	},
	{
		special_genes: 'mystic',
		name: 'Skull Cracker',
		ability_id: 'beast-mouth-02',
	},
	{
		special_genes: null,
		name: 'Goda',
		ability_id: 'beast-mouth-04',
	},
	{
		special_genes: null,
		name: 'Axie Kiss',
		ability_id: 'beast-mouth-08',
	},
	{
		special_genes: null,
		name: 'Confident',
		ability_id: 'beast-mouth-10',
	},
	{
		special_genes: null,
		name: 'Mosquito',
		ability_id: 'bug-mouth-02',
	},
	{
		special_genes: 'mystic',
		name: 'Feasting Mosquito',
		ability_id: 'bug-mouth-02',
	},
	{
		special_genes: null,
		name: 'Pincer',
		ability_id: 'bug-mouth-04',
	},
	{
		special_genes: null,
		name: 'Cute Bunny',
		ability_id: 'bug-mouth-08',
	},
	{
		special_genes: 'japan',
		name: 'Kawaii',
		ability_id: 'bug-mouth-08',
	},
	{
		special_genes: null,
		name: 'Square Teeth',
		ability_id: 'bug-mouth-10',
	},
	{
		special_genes: null,
		name: 'Lagging',
		ability_id: 'bug-horn-02',
	},
	{
		special_genes: 'mystic',
		name: 'Laggingggggg',
		ability_id: 'bug-horn-02',
	},
	{
		special_genes: null,
		name: 'Antenna',
		ability_id: 'bug-horn-04',
	},
	{
		special_genes: null,
		name: 'Caterpillars',
		ability_id: 'bug-horn-06',
	},
	{
		special_genes: null,
		name: 'Pliers',
		ability_id: 'bug-horn-08',
	},
	{
		special_genes: null,
		name: 'Parasite',
		ability_id: 'bug-horn-10',
	},
	{
		special_genes: 'bionic',
		name: 'P4R451T3',
		ability_id: 'bug-horn-10',
	},
	{
		special_genes: null,
		name: 'Leaf Bug',
		ability_id: 'bug-horn-12',
	},
	{
		special_genes: null,
		name: 'Ant',
		ability_id: 'bug-tail-02',
	},
	{
		special_genes: 'mystic',
		name: 'Fire Ant',
		ability_id: 'bug-tail-02',
	},
	{
		special_genes: null,
		name: 'Twin Tail',
		ability_id: 'bug-tail-04',
	},
	{
		special_genes: null,
		name: 'Fish Snack',
		ability_id: 'bug-tail-06',
	},
	{
		special_genes: 'japan',
		name: 'Maki',
		ability_id: 'bug-tail-06',
	},
	{
		special_genes: null,
		name: 'Gravel Ant',
		ability_id: 'bug-tail-08',
	},
	{
		special_genes: null,
		name: 'Pupae',
		ability_id: 'bug-tail-10',
	},
	{
		special_genes: null,
		name: 'Thorny Caterpillar',
		ability_id: 'bug-tail-12',
	},
	{
		special_genes: null,
		name: 'Snail Shell',
		ability_id: 'bug-back-02',
	},
	{
		special_genes: 'mystic',
		name: 'Starry Shell',
		ability_id: 'bug-back-02',
	},
	{
		special_genes: null,
		name: 'Garish Worm',
		ability_id: 'bug-back-04',
	},
	{
		special_genes: 'xmas',
		name: 'Candy Canes',
		ability_id: 'bug-back-04',
	},
	{
		special_genes: null,
		name: 'Buzz Buzz',
		ability_id: 'bug-back-06',
	},
	{
		special_genes: null,
		name: 'Sandal',
		ability_id: 'bug-back-08',
	},
	{
		special_genes: null,
		name: 'Scarab',
		ability_id: 'bug-back-10',
	},
	{
		special_genes: null,
		name: 'Spiky Wing',
		ability_id: 'bug-back-12',
	},
	{
		special_genes: null,
		name: 'Larva',
		ability_id: 'bug-ears-02',
	},
	{
		special_genes: 'mystic',
		name: 'Vector',
		ability_id: 'bug-ears-02',
	},
	{
		special_genes: null,
		name: 'Beetle Spike',
		ability_id: 'bug-ears-04',
	},
	{
		special_genes: null,
		name: 'Ear Breathing',
		ability_id: 'bug-ears-06',
	},
	{
		special_genes: null,
		name: 'Leaf Bug',
		ability_id: 'bug-ears-08',
	},
	{
		special_genes: null,
		name: 'Tassels',
		ability_id: 'bug-ears-10',
	},
	{
		special_genes: null,
		name: 'Earwing',
		ability_id: 'bug-ears-12',
	},
	{
		special_genes: 'japan',
		name: 'Mon',
		ability_id: 'bug-ears-12',
	},
	{
		special_genes: null,
		name: 'Bookworm',
		ability_id: 'bug-eyes-02',
	},
	{
		special_genes: 'mystic',
		name: 'Broken Bookworm',
		ability_id: 'bug-eyes-02',
	},
	{
		special_genes: null,
		name: 'Neo',
		ability_id: 'bug-eyes-04',
	},
	{
		special_genes: 'summer-2022',
		name: 'Flower Sunglasses',
		ability_id: 'bug-eyes-04',
	},
	{
		special_genes: 'summer-2022',
		name: 'Flower Sunglasses Shiny',
		ability_id: 'bug-eyes-04',
	},
	{
		special_genes: null,
		name: 'Nerdy',
		ability_id: 'bug-eyes-08',
	},
	{
		special_genes: null,
		name: 'Kotaro?',
		ability_id: 'bug-eyes-10',
	},
	{
		special_genes: null,
		name: 'Sleepless',
		ability_id: 'aquatic-eyes-02',
	},
	{
		special_genes: 'mystic',
		name: 'Insomnia',
		ability_id: 'aquatic-eyes-02',
	},
	{
		special_genes: 'japan',
		name: 'Yen',
		ability_id: 'aquatic-eyes-02',
	},
	{
		special_genes: null,
		name: 'Clear',
		ability_id: 'aquatic-eyes-04',
	},
	{
		special_genes: null,
		name: 'Gero',
		ability_id: 'aquatic-eyes-08',
	},
	{
		special_genes: null,
		name: 'Telescope',
		ability_id: 'aquatic-eyes-10',
	},
	{
		special_genes: null,
		name: 'Lam',
		ability_id: 'aquatic-mouth-02',
	},
	{
		special_genes: 'mystic',
		name: 'Lam Handsome',
		ability_id: 'aquatic-mouth-02',
	},
	{
		special_genes: null,
		name: 'Catfish',
		ability_id: 'aquatic-mouth-04',
	},
	{
		special_genes: null,
		name: 'Risky Fish',
		ability_id: 'aquatic-mouth-08',
	},
	{
		special_genes: 'summer-2022',
		name: 'Bubble Fish',
		ability_id: 'aquatic-mouth-08',
	},
	{
		special_genes: 'summer-2022',
		name: 'Bubble Fish Shiny',
		ability_id: 'aquatic-mouth-08',
	},
	{
		special_genes: null,
		name: 'Piranha',
		ability_id: 'aquatic-mouth-10',
	},
	{
		special_genes: 'japan',
		name: 'Geisha',
		ability_id: 'aquatic-mouth-10',
	},
	{
		special_genes: null,
		name: 'Babylonia',
		ability_id: 'aquatic-horn-02',
	},
	{
		special_genes: 'mystic',
		name: 'Candy Babylonia',
		ability_id: 'aquatic-horn-02',
	},
	{
		special_genes: null,
		name: 'Teal Shell',
		ability_id: 'aquatic-horn-04',
	},
	{
		special_genes: null,
		name: 'Clamshell',
		ability_id: 'aquatic-horn-06',
	},
	{
		special_genes: null,
		name: 'Anemone',
		ability_id: 'aquatic-horn-08',
	},
	{
		special_genes: null,
		name: 'Oranda',
		ability_id: 'aquatic-horn-10',
	},
	{
		special_genes: null,
		name: 'Shoal Star',
		ability_id: 'aquatic-horn-12',
	},
	{
		special_genes: 'bionic',
		name: '5H04L-5T4R',
		ability_id: 'aquatic-horn-12',
	},
	{
		special_genes: null,
		name: 'Nimo',
		ability_id: 'aquatic-ears-02',
	},
	{
		special_genes: 'mystic',
		name: 'Red Nimo',
		ability_id: 'aquatic-ears-02',
	},
	{
		special_genes: null,
		name: 'Tiny Fan',
		ability_id: 'aquatic-ears-04',
	},
	{
		special_genes: null,
		name: 'Bubblemaker',
		ability_id: 'aquatic-ears-06',
	},
	{
		special_genes: null,
		name: 'Inkling',
		ability_id: 'aquatic-ears-08',
	},
	{
		special_genes: null,
		name: 'Gill',
		ability_id: 'aquatic-ears-10',
	},
	{
		special_genes: null,
		name: 'Seaslug',
		ability_id: 'aquatic-ears-12',
	},
	{
		special_genes: null,
		name: 'Koi',
		ability_id: 'aquatic-tail-02',
	},
	{
		special_genes: 'mystic',
		name: 'Kuro Koi',
		ability_id: 'aquatic-tail-02',
	},
	{
		special_genes: 'japan',
		name: 'Koinobori',
		ability_id: 'aquatic-tail-02',
	},
	{
		special_genes: null,
		name: 'Nimo',
		ability_id: 'aquatic-tail-04',
	},
	{
		special_genes: null,
		name: 'Tadpole',
		ability_id: 'aquatic-tail-06',
	},
	{
		special_genes: null,
		name: 'Ranchu',
		ability_id: 'aquatic-tail-08',
	},
	{
		special_genes: null,
		name: 'Navaga',
		ability_id: 'aquatic-tail-10',
	},
	{
		special_genes: null,
		name: 'Shrimp',
		ability_id: 'aquatic-tail-12',
	},
	{
		special_genes: null,
		name: 'Hermit',
		ability_id: 'aquatic-back-02',
	},
	{
		special_genes: 'mystic',
		name: 'Crystal Hermit',
		ability_id: 'aquatic-back-02',
	},
	{
		special_genes: null,
		name: 'Blue Moon',
		ability_id: 'aquatic-back-04',
	},
	{
		special_genes: null,
		name: 'Goldfish',
		ability_id: 'aquatic-back-06',
	},
	{
		special_genes: null,
		name: 'Sponge',
		ability_id: 'aquatic-back-08',
	},
	{
		special_genes: null,
		name: 'Anemone',
		ability_id: 'aquatic-back-10',
	},
	{
		special_genes: null,
		name: 'Perch',
		ability_id: 'aquatic-back-12',
	},
	{
		special_genes: null,
		name: 'Pink Cheek',
		ability_id: 'bird-ears-02',
	},
	{
		special_genes: 'mystic',
		name: 'Heart Cheek',
		ability_id: 'bird-ears-02',
	},
	{
		special_genes: null,
		name: 'Early Bird',
		ability_id: 'bird-ears-04',
	},
	{
		special_genes: null,
		name: 'Owl',
		ability_id: 'bird-ears-06',
	},
	{
		special_genes: null,
		name: 'Peace Maker',
		ability_id: 'bird-ears-08',
	},
	{
		special_genes: null,
		name: 'Curly',
		ability_id: 'bird-ears-10',
	},
	{
		special_genes: null,
		name: 'Risky Bird',
		ability_id: 'bird-ears-12',
	},
	{
		special_genes: 'japan',
		name: 'Karimata',
		ability_id: 'bird-ears-12',
	},
	{
		special_genes: null,
		name: 'Swallow',
		ability_id: 'bird-tail-02',
	},
	{
		special_genes: 'mystic',
		name: 'Snowy Swallow',
		ability_id: 'bird-tail-02',
	},
	{
		special_genes: null,
		name: 'Feather Fan',
		ability_id: 'bird-tail-04',
	},
	{
		special_genes: null,
		name: 'The Last One',
		ability_id: 'bird-tail-06',
	},
	{
		special_genes: null,
		name: 'Cloud',
		ability_id: 'bird-tail-08',
	},
	{
		special_genes: null,
		name: "Granma's Fan",
		ability_id: 'bird-tail-10',
	},
	{
		special_genes: 'japan',
		name: 'Omatsuri',
		ability_id: 'bird-tail-10',
	},
	{
		special_genes: null,
		name: 'Post Fight',
		ability_id: 'bird-tail-12',
	},
	{
		special_genes: null,
		name: 'Balloon',
		ability_id: 'bird-back-02',
	},
	{
		special_genes: 'mystic',
		name: 'Starry Balloon',
		ability_id: 'bird-back-02',
	},
	{
		special_genes: null,
		name: 'Cupid',
		ability_id: 'bird-back-04',
	},
	{
		special_genes: 'japan',
		name: 'Origami',
		ability_id: 'bird-back-04',
	},
	{
		special_genes: null,
		name: 'Raven',
		ability_id: 'bird-back-06',
	},
	{
		special_genes: null,
		name: 'Pigeon Post',
		ability_id: 'bird-back-08',
	},
	{
		special_genes: null,
		name: 'Kingfisher',
		ability_id: 'bird-back-10',
	},
	{
		special_genes: null,
		name: 'Tri Feather',
		ability_id: 'bird-back-12',
	},
	{
		special_genes: null,
		name: 'Eggshell',
		ability_id: 'bird-horn-02',
	},
	{
		special_genes: 'mystic',
		name: 'Golden Shell',
		ability_id: 'bird-horn-02',
	},
	{
		special_genes: null,
		name: 'Cuckoo',
		ability_id: 'bird-horn-04',
	},
	{
		special_genes: null,
		name: 'Trump',
		ability_id: 'bird-horn-06',
	},
	{
		special_genes: null,
		name: 'Kestrel',
		ability_id: 'bird-horn-08',
	},
	{
		special_genes: null,
		name: 'Wing Horn',
		ability_id: 'bird-horn-10',
	},
	{
		special_genes: null,
		name: 'Feather Spear',
		ability_id: 'bird-horn-12',
	},
	{
		special_genes: 'xmas',
		name: 'Spruce Spear',
		ability_id: 'bird-horn-12',
	},
	{
		special_genes: null,
		name: 'Doubletalk',
		ability_id: 'bird-mouth-02',
	},
	{
		special_genes: 'mystic',
		name: 'Mr. Doubletalk',
		ability_id: 'bird-mouth-02',
	},
	{
		special_genes: null,
		name: 'Peace Maker',
		ability_id: 'bird-mouth-04',
	},
	{
		special_genes: null,
		name: 'Hungry Bird',
		ability_id: 'bird-mouth-08',
	},
	{
		special_genes: null,
		name: 'Little Owl',
		ability_id: 'bird-mouth-10',
	},
	{
		special_genes: null,
		name: 'Mavis',
		ability_id: 'bird-eyes-02',
	},
	{
		special_genes: 'mystic',
		name: 'Sky Mavis',
		ability_id: 'bird-eyes-02',
	},
	{
		special_genes: null,
		name: 'Lucas',
		ability_id: 'bird-eyes-04',
	},
	{
		special_genes: 'xmas-2019',
		name: 'Icy Gaze',
		ability_id: 'bird-eyes-04',
	},
	{
		special_genes: null,
		name: 'Little Owl',
		ability_id: 'bird-eyes-08',
	},
	{
		special_genes: null,
		name: 'Robin',
		ability_id: 'bird-eyes-10',
	},
	{
		special_genes: null,
		name: 'Gecko',
		ability_id: 'reptile-eyes-02',
	},
	{
		special_genes: 'mystic',
		name: 'Crimson Gecko',
		ability_id: 'reptile-eyes-02',
	},
	{
		special_genes: null,
		name: 'Tricky',
		ability_id: 'reptile-eyes-04',
	},
	{
		special_genes: null,
		name: 'Scar',
		ability_id: 'reptile-eyes-08',
	},
	{
		special_genes: 'japan',
		name: 'Dokuganryu',
		ability_id: 'reptile-eyes-08',
	},
	{
		special_genes: null,
		name: 'Topaz',
		ability_id: 'reptile-eyes-10',
	},
	{
		special_genes: 'japan',
		name: 'Kabuki',
		ability_id: 'reptile-eyes-10',
	},
	{
		special_genes: null,
		name: 'Toothless Bite',
		ability_id: 'reptile-mouth-02',
	},
	{
		special_genes: 'mystic',
		name: 'Venom Bite',
		ability_id: 'reptile-mouth-02',
	},
	{
		special_genes: null,
		name: 'Kotaro',
		ability_id: 'reptile-mouth-04',
	},
	{
		special_genes: null,
		name: 'Razor Bite',
		ability_id: 'reptile-mouth-08',
	},
	{
		special_genes: null,
		name: 'Tiny Turtle',
		ability_id: 'reptile-mouth-10',
	},
	{
		special_genes: 'japan',
		name: 'Dango',
		ability_id: 'reptile-mouth-10',
	},
	{
		special_genes: 'xmas-2019',
		name: 'Tiny Carrot',
		ability_id: 'reptile-mouth-10',
	},
	{
		special_genes: null,
		name: 'Pogona',
		ability_id: 'reptile-ears-02',
	},
	{
		special_genes: 'mystic',
		name: 'Deadly Pogona',
		ability_id: 'reptile-ears-02',
	},
	{
		special_genes: null,
		name: 'Friezard',
		ability_id: 'reptile-ears-04',
	},
	{
		special_genes: null,
		name: 'Curved Spine',
		ability_id: 'reptile-ears-06',
	},
	{
		special_genes: null,
		name: 'Small Frill',
		ability_id: 'reptile-ears-08',
	},
	{
		special_genes: null,
		name: 'Swirl',
		ability_id: 'reptile-ears-10',
	},
	{
		special_genes: null,
		name: 'Sidebarb',
		ability_id: 'reptile-ears-12',
	},
	{
		special_genes: null,
		name: 'Bone Sail',
		ability_id: 'reptile-back-02',
	},
	{
		special_genes: 'mystic',
		name: 'Rugged Sail',
		ability_id: 'reptile-back-02',
	},
	{
		special_genes: null,
		name: 'Tri Spikes',
		ability_id: 'reptile-back-04',
	},
	{
		special_genes: null,
		name: 'Green Thorns',
		ability_id: 'reptile-back-06',
	},
	{
		special_genes: null,
		name: 'Indian Star',
		ability_id: 'reptile-back-08',
	},
	{
		special_genes: 'bionic',
		name: '1ND14N-5T4R',
		ability_id: 'reptile-back-08',
	},
	{
		special_genes: 'xmas-2019',
		name: 'Frozen Bucket',
		ability_id: 'reptile-back-08',
	},
	{
		special_genes: null,
		name: 'Red Ear',
		ability_id: 'reptile-back-10',
	},
	{
		special_genes: 'summer-2022',
		name: 'Turtle Buoy',
		ability_id: 'reptile-back-10',
	},
	{
		special_genes: 'summer-2022',
		name: 'Turtle Buoy Shiny',
		ability_id: 'reptile-back-10',
	},
	{
		special_genes: null,
		name: 'Croc',
		ability_id: 'reptile-back-12',
	},
	{
		special_genes: null,
		name: 'Wall Gecko',
		ability_id: 'reptile-tail-02',
	},
	{
		special_genes: 'mystic',
		name: 'Escaped Gecko',
		ability_id: 'reptile-tail-02',
	},
	{
		special_genes: null,
		name: 'Iguana',
		ability_id: 'reptile-tail-04',
	},
	{
		special_genes: null,
		name: 'Tiny Dino',
		ability_id: 'reptile-tail-06',
	},
	{
		special_genes: 'xmas-2019',
		name: 'Fir Trunk',
		ability_id: 'reptile-tail-06',
	},
	{
		special_genes: null,
		name: 'Snake Jar',
		ability_id: 'reptile-tail-08',
	},
	{
		special_genes: 'xmas',
		name: 'December Surprise',
		ability_id: 'reptile-tail-08',
	},
	{
		special_genes: null,
		name: 'Gila',
		ability_id: 'reptile-tail-10',
	},
	{
		special_genes: null,
		name: 'Grass Snake',
		ability_id: 'reptile-tail-12',
	},
	{
		special_genes: null,
		name: 'Unko',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'mystic',
		name: 'Pinku Unko',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Watermelon Ice Cream',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Strawberry Ice Cream',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Vanilla Ice Cream',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Watermelon Ice Cream Shiny',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Strawberry Ice Cream Shiny',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: 'summer-2022',
		name: 'Vanilla Ice Cream Shiny',
		ability_id: 'reptile-horn-02',
	},
	{
		special_genes: null,
		name: 'Scaly Spear',
		ability_id: 'reptile-horn-04',
	},
	{
		special_genes: null,
		name: 'Cerastes',
		ability_id: 'reptile-horn-06',
	},
	{
		special_genes: null,
		name: 'Scaly Spoon',
		ability_id: 'reptile-horn-08',
	},
	{
		special_genes: null,
		name: 'Incisor',
		ability_id: 'reptile-horn-10',
	},
	{
		special_genes: null,
		name: 'Bumpy',
		ability_id: 'reptile-horn-12',
	},
	{
		special_genes: null,
		name: 'Carrot',
		ability_id: 'plant-tail-02',
	},
	{
		special_genes: 'mystic',
		name: 'Namek Carrot',
		ability_id: 'plant-tail-02',
	},
	{
		special_genes: null,
		name: 'Cattail',
		ability_id: 'plant-tail-04',
	},
	{
		special_genes: null,
		name: 'Hatsune',
		ability_id: 'plant-tail-06',
	},
	{
		special_genes: null,
		name: 'Yam',
		ability_id: 'plant-tail-08',
	},
	{
		special_genes: null,
		name: 'Potato Leaf',
		ability_id: 'plant-tail-10',
	},
	{
		special_genes: null,
		name: 'Hot Butt',
		ability_id: 'plant-tail-12',
	},
	{
		special_genes: null,
		name: 'Serious',
		ability_id: 'plant-mouth-02',
	},
	{
		special_genes: 'mystic',
		name: 'Humorless',
		ability_id: 'plant-mouth-02',
	},
	{
		special_genes: null,
		name: 'Zigzag',
		ability_id: 'plant-mouth-04',
	},
	{
		special_genes: 'xmas',
		name: 'Rudolph',
		ability_id: 'plant-mouth-04',
	},
	{
		special_genes: null,
		name: 'Herbivore',
		ability_id: 'plant-mouth-08',
	},
	{
		special_genes: null,
		name: 'Silence Whisper',
		ability_id: 'plant-mouth-10',
	},
	{
		special_genes: null,
		name: 'Papi',
		ability_id: 'plant-eyes-02',
	},
	{
		special_genes: 'mystic',
		name: 'Dreamy Papi',
		ability_id: 'plant-eyes-02',
	},
	{
		special_genes: null,
		name: 'Confused',
		ability_id: 'plant-eyes-04',
	},
	{
		special_genes: null,
		name: 'Cucumber Slice',
		ability_id: 'plant-eyes-08',
	},
	{
		special_genes: null,
		name: 'Blossom',
		ability_id: 'plant-eyes-10',
	},
	{
		special_genes: null,
		name: 'Leafy',
		ability_id: 'plant-ears-02',
	},
	{
		special_genes: 'mystic',
		name: 'The Last Leaf',
		ability_id: 'plant-ears-02',
	},
	{
		special_genes: null,
		name: 'Clover',
		ability_id: 'plant-ears-04',
	},
	{
		special_genes: null,
		name: 'Rosa',
		ability_id: 'plant-ears-06',
	},
	{
		special_genes: null,
		name: 'Sakura',
		ability_id: 'plant-ears-08',
	},
	{
		special_genes: 'japan',
		name: 'Maiko',
		ability_id: 'plant-ears-08',
	},
	{
		special_genes: null,
		name: 'Hollow',
		ability_id: 'plant-ears-10',
	},
	{
		special_genes: 'xmas-2019',
		name: 'Pinecones',
		ability_id: 'plant-ears-10',
	},
	{
		special_genes: null,
		name: 'Lotus',
		ability_id: 'plant-ears-12',
	},
	{
		special_genes: null,
		name: 'Turnip',
		ability_id: 'plant-back-02',
	},
	{
		special_genes: 'mystic',
		name: 'Pink Turnip',
		ability_id: 'plant-back-02',
	},
	{
		special_genes: null,
		name: 'Shiitake',
		ability_id: 'plant-back-04',
	},
	{
		special_genes: 'japan',
		name: 'Yakitori',
		ability_id: 'plant-back-04',
	},
	{
		special_genes: null,
		name: 'Bidens',
		ability_id: 'plant-back-06',
	},
	{
		special_genes: null,
		name: 'Watering Can',
		ability_id: 'plant-back-08',
	},
	{
		special_genes: null,
		name: 'Mint',
		ability_id: 'plant-back-10',
	},
	{
		special_genes: null,
		name: 'Pumpkin',
		ability_id: 'plant-back-12',
	},
	{
		special_genes: null,
		name: 'Bamboo Shoot',
		ability_id: 'plant-horn-02',
	},
	{
		special_genes: 'mystic',
		name: 'Golden Bamboo Shoot',
		ability_id: 'plant-horn-02',
	},
	{
		special_genes: null,
		name: 'Beech',
		ability_id: 'plant-horn-04',
	},
	{
		special_genes: 'japan',
		name: 'Yorishiro',
		ability_id: 'plant-horn-04',
	},
	{
		special_genes: null,
		name: 'Rose Bud',
		ability_id: 'plant-horn-06',
	},
	{
		special_genes: null,
		name: 'Strawberry Shortcake',
		ability_id: 'plant-horn-08',
	},
	{
		special_genes: null,
		name: 'Cactus',
		ability_id: 'plant-horn-10',
	},
	{
		special_genes: 'xmas-2019',
		name: "Santa's Gift",
		ability_id: 'plant-horn-10',
	},
	{
		special_genes: null,
		name: 'Watermelon',
		ability_id: 'plant-horn-12',
	},
]

const partMap: Record<string, string> = {}

for (const part of PARTS) {
	const key = part.name
		.toLowerCase()
		.replace(/\s/g, '-')
		.replace(/[^\w-]/g, '')

	const partId = part.ability_id.split('-')
	const value = `${partId[0] === 'aquatic' ? 'aqua' : partId[0]}_${partId[2]}`

	partMap[key] = value
}

console.log(partMap)
