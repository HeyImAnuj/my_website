import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { dirname, isAbsolute, resolve } from 'path';
import { fileURLToPath } from 'url';

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export interface DriveAssets {
  resumeFileId: string | null;
  avatarFileId: string | null;
}

interface DriveFile {
  id?: string | null;
  name?: string | null;
  modifiedTime?: string | null;
}

interface CachedAssets {
  assets: DriveAssets;
  expiresAt: number;
}

let cache: CachedAssets | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000;
let missingKeyFileWarned = false;

function resolveKeyFilePath(keyFile: string): string {
  if (isAbsolute(keyFile)) return keyFile;
  return resolve(backendRoot, keyFile);
}

function getServiceAccountCredentials(): Record<string, unknown> | null {
  const inlineJson = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON;
  if (inlineJson) {
    try {
      return JSON.parse(inlineJson) as Record<string, unknown>;
    } catch {
      if (!missingKeyFileWarned) {
        console.warn('Invalid GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON');
        missingKeyFileWarned = true;
      }
      return null;
    }
  }

  const keyFile = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY_FILE;
  if (!keyFile) return null;

  const resolvedPath = resolveKeyFilePath(keyFile);

  try {
    const content = readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    if (!missingKeyFileWarned) {
      console.warn(
        `Google Drive: service account key not found at ${resolvedPath}\n` +
          '  → Download a JSON key from Google Cloud Console and save it there.\n' +
          '  → Share your Drive folder with the service account email as Viewer.'
      );
      missingKeyFileWarned = true;
    }
    return null;
  }
}

function getDriveClient() {
  const credentials = getServiceAccountCredentials();
  if (!credentials) return null;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
}

function isImageFile(name: string): boolean {
  return /\.(jpe?g|png|webp)$/i.test(name);
}

function matchesResumePattern(name: string): boolean {
  return /resume/i.test(name) && /\.pdf$/i.test(name);
}

function matchesAvatarPattern(name: string): boolean {
  return (
    (/^(profile|avatar|photo)/i.test(name) || /^anuj\./i.test(name)) &&
    isImageFile(name)
  );
}

function findByExactName(files: DriveFile[], targetName: string): string | null {
  const target = targetName.toLowerCase();
  const match = files.find((file) => file.name?.toLowerCase() === target);
  return match?.id ?? null;
}

function findByPattern(
  files: DriveFile[],
  matcher: (name: string) => boolean
): string | null {
  const match = files.find((file) => file.name && matcher(file.name));
  return match?.id ?? null;
}

async function resolveFromFolder(folderId: string): Promise<DriveAssets> {
  const drive = getDriveClient();
  if (!drive) {
    return { resumeFileId: null, avatarFileId: null };
  }

  const resumeFilename =
    process.env.GOOGLE_DRIVE_RESUME_FILENAME ?? 'Anuj_resume.pdf';
  const avatarFilename = process.env.GOOGLE_DRIVE_AVATAR_FILENAME ?? 'anuj.jpg';

  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const files = response.data.files ?? [];

  const resumeFileId =
    findByExactName(files, resumeFilename) ??
    findByPattern(files, matchesResumePattern);

  const avatarFileId =
    findByExactName(files, avatarFilename) ??
    findByPattern(files, matchesAvatarPattern) ??
    findByPattern(
      files,
      (name) => isImageFile(name) && !matchesResumePattern(name)
    );

  return { resumeFileId, avatarFileId };
}

function resolveFromEnv(): DriveAssets {
  return {
    resumeFileId: process.env.GOOGLE_DRIVE_RESUME_FILE_ID ?? null,
    avatarFileId: process.env.GOOGLE_DRIVE_AVATAR_FILE_ID ?? null,
  };
}

export async function getDriveAssets(): Promise<DriveAssets> {
  if (cache && Date.now() < cache.expiresAt) {
    return cache.assets;
  }

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  let assets: DriveAssets;

  if (folderId && getServiceAccountCredentials()) {
    try {
      assets = await resolveFromFolder(folderId);
      if (!assets.resumeFileId || !assets.avatarFileId) {
        const envFallback = resolveFromEnv();
        assets = {
          resumeFileId: assets.resumeFileId ?? envFallback.resumeFileId,
          avatarFileId: assets.avatarFileId ?? envFallback.avatarFileId,
        };
      }
    } catch (error) {
      console.error('Google Drive folder lookup failed:', error);
      assets = resolveFromEnv();
    }
  } else {
    assets = resolveFromEnv();
  }

  cache = { assets, expiresAt: Date.now() + CACHE_TTL_MS };
  return assets;
}

export function clearDriveCache() {
  cache = null;
}

export async function streamDriveFile(fileId: string) {
  const drive = getDriveClient();
  if (!drive) {
    throw new Error('Google Drive is not configured');
  }

  return drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  );
}

export function isDriveConfigured(): boolean {
  const hasFolderSetup = Boolean(
    process.env.GOOGLE_DRIVE_FOLDER_ID && getServiceAccountCredentials()
  );
  const hasFileIds = Boolean(
    process.env.GOOGLE_DRIVE_RESUME_FILE_ID ||
      process.env.GOOGLE_DRIVE_AVATAR_FILE_ID
  );
  return hasFolderSetup || hasFileIds;
}

export function hasServiceAccount(): boolean {
  return Boolean(getServiceAccountCredentials());
}

export function getPublicDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function getPublicDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}
