const sharp = require('sharp');
const axios = require('axios');
const os = require('os');
const path = require('path');

const convertImgToWebp = (imageUrl) => {
    // Tạo tên tệp duy nhất cho tệp WebP
    const tempDir = os.tmpdir();

    const outputImagePath = path.join(tempDir, `${Date.now()}.webp`);
    // Tải xuống hình ảnh từ URL
    axios
        .get(imageUrl, { responseType: 'arraybuffer' })
        .then((response) => {
            // Chuyển đổi dữ liệu nhận được thành buffer
            const buffer = Buffer.from(response.data, 'binary');

            // Chuyển đổi hình ảnh sang định dạng WebP
            sharp(buffer)
                .toFormat('webp')
                .toFile(outputImagePath, (err, info) => {
                    if (err) {
                        console.error('Lỗi chuyển đổi hình ảnh:', err);
                    } else {
                        console.log('Hình ảnh đã được chuyển đổi sang định dạng WebP:', info);
                    }
                });
        })
        .catch((error) => {
            console.error('Lỗi tải xuống hình ảnh:', error);
        });

    return outputImagePath
}

module.exports = {convertImgToWebp}
