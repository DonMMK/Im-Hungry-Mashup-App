// Acessing Environment Variables from Node

// Create an S3 headbucket request
function createBucket(s3, bucket, s3Key) {
    const options = {
            Bucket: bucket,
        }
        // Check if bucket exists
    s3.headBucket(options).promise()
        .then((resp) => {
            console.log("Bucket exists with name" + bucket);
            // If bucket exists, check if object exists.
            s3.getObject({ Bucket: bucket, Key: s3Key }).promise()
                .then((resp) => {
                    console.log("Object exists with key " + s3Key);
                })
                // If not, create object
                .catch((err) => {
                    console.log("Object does not exist with key" + s3Key);
                    // Once object is created, initialise counter to 0
                    s3.putObject({ Bucket: bucket, Key: s3Key, Body: "0" }).promise()
                        .then((resp) => {
                            console.log("Object created with key" + s3Key);
                            console.log("Object content: " + "0");
                        });
                });
        })
        // If bucket does not exist, create bucket
        .catch((error) => {
            if (error.statusCode === 404) {
                console.log("Bucket does not exist with name" + bucket);
                console.log("Creating bucket with name" + bucket);
                s3.createBucket({ Bucket: bucket }).promise()
                    // Once bucket is created, create object
                    .then((resp) => {
                        console.log("Bucket created with name" + bucket);
                        s3.putObject({ Bucket: bucket, Key: s3Key, Body: "0" }).promise()
                            .then((resp) => {
                                console.log("Object created with key" + s3Key);
                            })
                            // If object creation fails, log error
                            .catch((error) => {
                                console.log("Error creating object with key" + s3Key);
                                throw new Error("Object creation failed");
                            });
                    })
                    // If bucket creation fails, log error
                    .catch((error) => {
                        console.log("Error creating bucket with name" + bucket);
                        throw new Error("Bucket creation failed");
                    });
            } else {
                // Throws error when authentication fails 
                // throw new Error("Authentication failed");
                throw error;
            }


        });
}

module.exports = { createBucket };