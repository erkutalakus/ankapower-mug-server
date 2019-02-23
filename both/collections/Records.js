Records = new Mongo.Collection('records');

VideoRecordsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Video Title"
	},
	url: {
		type: String,
		label: "Video Link"
	},
	rank: {
		type: Number,
		label: "Rank"
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

RecordsSchema = new SimpleSchema({
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
	counter: {
		type: Number,
		autoform: {
			type: 'hidden'
		}
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