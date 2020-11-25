const AWS = require("aws-sdk");
const uuid = require("uuid").v4

const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

class S3Service {
    async uploadFile(base64, fileExtension) {
        const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const type = base64.split(';')[0].split('/')[1];

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${uuid()}.${fileExtension}`,
            Body: base64Data,
            ContentType: "image/" + type,
        }
        return await this.upload(params);
    }

    upload(params) {
        return new Promise(function (resolve, reject) {
            S3.upload(params, (error, data) => {
                if (error)
                    reject(error)
                console.log(data);
                resolve(data.Location)
            })
        });
    }
}

const s3Service = new S3Service();

module.exports = s3Service;
