/**
 * Resize gambar di browser menggunakan Canvas ke format WebP
 * @param {File} file - File gambar asli
 * @param {number} maxDimension - Batas lebar/tinggi maksimal (e.g. 800 atau 2400)
 * @param {number} quality - Kualitas kompresi WebP (0.1 - 1.0)
 * @returns {Promise<{blob: Blob, width: number, height: number}>}
 */
export async function resizeImageToWebP(file, maxDimension = 2400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, width, height });
            } else {
              reject(new Error('Gagal membuat blob WebP'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Tangkap 1 frame dari file video untuk dijadikan poster WebP
 * @param {File} videoFile 
 * @returns {Promise<{blob: Blob, width: number, height: number, duration: number}>}
 */
export async function captureVideoPoster(videoFile) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(videoFile);
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      // Seek ke detik ke-1 atau 0.5 agar tidak hitam
      video.currentTime = Math.min(1.0, video.duration / 2);
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(video.src);
          if (blob) {
            resolve({
              blob,
              width: video.videoWidth,
              height: video.videoHeight,
              duration: Math.round(video.duration)
            });
          } else {
            reject(new Error('Gagal mengekstrak poster video'));
          }
        },
        'image/webp',
        0.85
      );
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Gagal membaca file video'));
    };
  });
}
