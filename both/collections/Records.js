Records = new Mongo.Collection('records');

VideoRecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Video Title"
	},
	url: {
		type: String,
		label: "Youtube Video Id"
	},
	rank: {
		type: Number,
		label: "Rank"
	},
	minAge: {
		type: Number,
		label: "Age Limit"
	},
	gender: {
		type: String,
		allowedValues: ['All', 'Male', 'Female']
	}
});

ImageRecordsSchema = new SimpleSchema({
	id: {
		type: String,
		label: "Image",
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'Images'
			}
		}
	},
	minAge: {
		type: Number,
		label: "Age Limit"
	},
	gender: {
		type: String,
		allowedValues: ['All', 'Male', 'Female']
	}
});

ImageGroupRecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Images Title"
	},
	images: {
		type: [ImageRecordsSchema],
		label: "Images",
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'Images'
			}
		}
	},
	rank: {
		type: Number,
		label: "Rank"
	}
});

TextRecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Text Title"
	},
	text: {
		type: String,
		label: "Text",
		autoform: {
			afFieldInput: {
				type: 'summernote',
				class: 'editor' // optional
				//settings: // summernote options goes here
			}
		}
	},
	rank: {
		type: Number,
		label: "Rank"
	},
	minAge: {
		type: Number,
		label: "Age Limit"
	},
	gender: {
		type: String,
		allowedValues: ['All', 'Male', 'Female']
	}
});

DocumentRecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Document Title"
	},
	id: {
		type: String,
		label: "Document(PDF)",
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'PDFs'
			}
		}
	},
	rank: {
		type: Number,
		label: "Rank"
	},
	minAge: {
		type: Number,
		label: "Age Limit"
	},
	gender: {
		type: String,
		allowedValues: ['All', 'Male', 'Female']
	}
});

LocationRecordsSchema = new SimpleSchema({
	latitude: {
		type: String,
		label: "Latitude"
	},
	longitude: {
		type: String,
		label: "Longitude"
	},
	address: {
		type: String,
		label: "Address"
	},
	rank: {
		type: Number,
		label: "Rank"
	}
});

DateRecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Date Title"
	},
	date: {
		type: Date,
		label: "Date"
	},
	rank: {
		type: Number,
		label: "Rank"
	}
});

RecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Main Title"
	},
	imageGroups: {
		type: [ImageGroupRecordsSchema],
		label: "ImageGroups",
		optional: true
	},
	videos: {
		type: [VideoRecordsSchema],
		label: "Videos",
		optional: true
	},
	texts: {
		type: [TextRecordsSchema],
		label: "Texts",
		optional: true
	},
	documents: {
		type: [DocumentRecordsSchema],
		label: "Documents",
		optional: true
	},
	locations: {
		type: [LocationRecordsSchema],
		label: "Locations",
		optional: true
	},
	dates: {
		type: [DateRecordsSchema],
		label: "Dates",
		optional: true
	},
	minAge: {
		type: Number,
		label: "Age Limit"
	},
	counter: {
		type: Number,
		autoform: {
			type: 'hidden'
		},
		defaultValue: 0
	}
});

Records.allow({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return false;
	}
});

Records.attachSchema(RecordsSchema);