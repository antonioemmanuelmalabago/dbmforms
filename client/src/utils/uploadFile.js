export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  )
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
    { method: 'POST', body: formData, redirect: 'follow' },
  )

  const data = await res.json()
  if (!data.secure_url) console.log('Erorr getting download URL: ', error)
  return data.secure_url
}
