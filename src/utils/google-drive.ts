export function getGoogleDriveImageUrl(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function getGoogleDriveDownloadUrl(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function extractGoogleDriveFileId(input: string) {
  const patterns = [/\/file\/d\/([^/]+)/, /id=([^&]+)/];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match?.[1]) return match[1];
  }

  return input.trim();
}
