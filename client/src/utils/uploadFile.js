import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import app from '../config/firebase'

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app)
    const name = new Date().getTime() + '_' + file.name
    const storageRef = ref(storage, 'dbmforms/' + name)

    // Create file metadata for content type
    const metadata = {
      contentType: file.type,
    }

    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.log('Erorr: ', error)
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File uploaded successfully')
            resolve(downloadURL)
          })
          .catch((error) => {
            console.log('Erorr getting download URL: ', error)
            reject(error)
          })
      }
    )
  })
}
