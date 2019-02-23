PDFs = new FilesCollection({
    collectionName: 'PDFs',
    storagePath : '/persistent/PDFs',
    allowClientCode: true, // Required to let you remove uploaded file
    onBeforeUpload: function (file) {
        // Allow upload files under 25MB, and only in pdf format
        if (file.size <= 26214400 && /pdf/i.test(file.ext)) {
            return true;
        } else {
            return 'Please upload pdf, with size equal or less than 25MB';
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