import { defineEventHandler, getQuery } from 'h3';
import { referensiCategories, type ReferensiFolder, type ReferensiPdf } from '~/data/referensiData';

// Cache in memory for 10 minutes to prevent hitting Google Drive API rate limits
let cachedResponse: { source: 'gdrive_api' | 'local_fallback'; updatedAt: string; categories: ReferensiFolder[] } | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 menit

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const forceRefresh = query.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && cachedResponse && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedResponse;
  }

  const config = useRuntimeConfig();
  const apiKey = config.googleDriveApiKey || process.env.GOOGLE_DRIVE_API_KEY || '';
  const parentFolderId = config.googleDriveParentFolderId || process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || '';

  // If no API Key is configured, fallback to static categories
  if (!apiKey) {
    const fallbackResult = {
      source: 'local_fallback' as const,
      updatedAt: new Date().toISOString(),
      categories: referensiCategories
    };
    cachedResponse = fallbackResult;
    lastCacheTime = now;
    return fallbackResult;
  }

  try {
    let resultCategories: ReferensiFolder[] = [];

    if (parentFolderId) {
      // 1. Fetch subfolders inside parentFolderId
      const folderQueryUrl = `https://www.googleapis.com/drive/v3/files?q='${parentFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${apiKey}&fields=files(id,name,description)&pageSize=100`;
      const folderRes = await $fetch<{ files: { id: string; name: string; description?: string }[] }>(folderQueryUrl);
      
      const subfolders = folderRes.files || [];

      for (const folder of subfolders) {
        // Fetch files inside subfolder
        const filesUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType)&pageSize=100`;
        const filesRes = await $fetch<{ files: { id: string; name: string; mimeType?: string }[] }>(filesUrl);
        
        const driveFiles = (filesRes.files || [])
          .filter(f => f.mimeType === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
          .map(f => ({
            id: f.id,
            title: f.name,
            driveFileId: f.id,
            previewUrl: `https://drive.google.com/file/d/${f.id}/preview`,
            directDriveUrl: `https://drive.google.com/file/d/${f.id}/view`
          }));

        resultCategories.push({
          id: folder.id,
          name: folder.name,
          description: folder.description || `Folder referensi ${folder.name}`,
          driveFolderId: folder.id,
          driveFolderUrl: `https://drive.google.com/drive/folders/${folder.id}`,
          files: driveFiles
        });
      }
    } else {
      // 2. Fetch files for each default category folder ID
      for (const cat of referensiCategories) {
        if (!cat.driveFolderId) {
          resultCategories.push(cat);
          continue;
        }

        try {
          const filesUrl = `https://www.googleapis.com/drive/v3/files?q='${cat.driveFolderId}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType)&pageSize=100`;
          const filesRes = await $fetch<{ files: { id: string; name: string; mimeType?: string }[] }>(filesUrl);
          
          const driveFiles: ReferensiPdf[] = (filesRes.files || [])
            .filter(f => f.mimeType === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
            .map(f => ({
              id: f.id,
              title: f.name,
              driveFileId: f.id,
              previewUrl: `https://drive.google.com/file/d/${f.id}/preview`,
              directDriveUrl: `https://drive.google.com/file/d/${f.id}/view`
            }));

          resultCategories.push({
            ...cat,
            files: driveFiles.length > 0 ? driveFiles : cat.files
          });
        } catch {
          // If error fetching specific folder, keep static fallback for this folder
          resultCategories.push(cat);
        }
      }
    }

    const liveResult = {
      source: 'gdrive_api' as const,
      updatedAt: new Date().toISOString(),
      categories: resultCategories.length > 0 ? resultCategories : referensiCategories
    };

    cachedResponse = liveResult;
    lastCacheTime = now;
    return liveResult;
  } catch (error) {
    console.error('Error fetching Google Drive API:', error);
    const fallbackResult = {
      source: 'local_fallback' as const,
      updatedAt: new Date().toISOString(),
      categories: referensiCategories
    };
    return fallbackResult;
  }
});
