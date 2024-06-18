export const uploadToCloundinary = async (file) => {
  const UPLOAD_PRESET = 'preset.my-brand';
  const CLOUDINARY_NAME = 'dypgowxrg';
  const CLOUDINARY_API_KEY = '195966529296813';
  // const CLOUDINARY_SECRET = "JLS3HUyk8k5Zt_G50NnL-maIFHk"
  const CLOUDINARY_IMAGES_FOLDER = 'candidates-images';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', `codeinfuse, medium, gist`);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', new Date().toDateString());
  formData.append('folder', CLOUDINARY_IMAGES_FOLDER);

  try {
    const apiResponse = await axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
        formData,
        {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }
      )
      .then((response) => {
        const data = response.data;
        const fileURL = data.secure_url;
        return data;
      });
    if (!apiResponse.asset_id)
      return (response = { success: false, error: 'Failed to upload image' });
    response = { success: true, fileUrl: apiResponse.secure_url };

    return response.fileUrl;
  } catch (e) {
    return (response = {
      success: false,
      error: e.message || 'Failed to upload image',
    });
  }
};
