const path = require('path')
const fs = require('fs')
const { storage } = require('configs')
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const uuid = require('uuid')

const s3Client = new S3Client({ region: storage.region })

module.exports = {
  upload: async ({
    data: {
      file,
      bucketPath = 'develop',
      name,
    },
  }) => {
    let filePath
    if (name) {
      filePath = `${bucketPath}/${name}${path.extname(file.originalFilename)}`
    } else {
      filePath = `${bucketPath}/${uuid.v4().replace(/-/g, '')}${path.extname(file.originalFilename)}`
    }
    const fileStream = fs.createReadStream(file.filepath)
    const uploadParams = {
      Bucket: storage.bucketName,
      Key: filePath,
      Body: fileStream,
    }
    const data = await s3Client.send(new PutObjectCommand(uploadParams))
    let result
    if (data['$metadata'].httpStatusCode === 200) {
      result = {
        status: 'success',
        file_path: filePath,
        bucket_path: bucketPath,
      }
    } else {
      result = { status: 'fail' }
    }
    return result
  },
  download: async ({
    data: {
      key,
    },
  }) => {
    const bucketParams = {
      Bucket: storage.bucketName,
      Key: key,
    }
    const data = await s3Client.send(new GetObjectCommand(bucketParams))
    return data.Body
  },
  getSignedUrl: async ({
    data: {
      key,
      expire = 3600,
    },
  }) => {
    const bucketParams = {
      Bucket: storage.bucketName,
      Key: key,
    }
    const url = await getSignedUrl(s3Client, new GetObjectCommand(bucketParams), { expiresIn: expire })
    return { url }
  },
}
