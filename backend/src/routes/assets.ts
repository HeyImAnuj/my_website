import { Router } from 'express';
import {
  getDriveAssets,
  streamDriveFile,
  hasServiceAccount,
  getPublicDriveDownloadUrl,
  getPublicDriveImageUrl,
} from '../lib/googleDrive.js';

export const assetsRouter = Router();

async function serveAsset(
  type: 'resume' | 'avatar',
  res: import('express').Response
) {
  const assets = await getDriveAssets();
  const fileId = type === 'resume' ? assets.resumeFileId : assets.avatarFileId;

  if (!fileId) {
    res.status(404).json({
      error: `${type} not configured`,
      hint: 'Set GOOGLE_DRIVE_FOLDER_ID or GOOGLE_DRIVE_*_FILE_ID in backend/.env',
    });
    return;
  }

  if (!hasServiceAccount()) {
    const url =
      type === 'resume'
        ? getPublicDriveDownloadUrl(fileId)
        : getPublicDriveImageUrl(fileId);
    res.redirect(url);
    return;
  }

  try {
    const response = await streamDriveFile(fileId);
    const contentType =
      type === 'resume'
        ? 'application/pdf'
        : (response.headers['content-type'] as string) || 'image/jpeg';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=300');
    response.data.pipe(res);
  } catch (error) {
    console.error(`Failed to stream ${type} from Google Drive:`, error);
    res.status(502).json({ error: `Failed to load ${type} from Google Drive` });
  }
}

assetsRouter.get('/resume', (req, res) => serveAsset('resume', res));
assetsRouter.get('/avatar', (req, res) => serveAsset('avatar', res));
