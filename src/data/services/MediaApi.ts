import { postAuth } from '../../core/http';

export interface PresignedUpload {
  uploadUrl: string;
  publicUrl: string;
}

export class MediaApi {
  async getPresignedUrl(): Promise<PresignedUpload> {
    const res = await postAuth<PresignedUpload>('/uploads/presign/', {
      contentType: 'image/jpeg',
    });

    return res;
  }
}
