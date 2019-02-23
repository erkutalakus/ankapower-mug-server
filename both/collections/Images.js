Images = new FilesCollection({
    collectionName: 'Images',
    storagePath : '/persistent/Images',
    allowClientCode: true, // Required to let you remove uploaded file
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 3145728 && /png|jpg|jpeg/i.test(file.ext)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 3MB';
        }
    },
    onBeforeRemove: function (cursor) {
        var records = cursor.fetch();

        // TODO Set the image remove condition

        if (this.userId)
        {
            var user = this.user();
            // Assuming user.profile.docs is array
            // with file's records _id(s)

            return true;
        }
        else {
            return false;
        }

    }
});