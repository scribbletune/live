export const playClip = (channelId, clipId) => ({
  type: 'PLAY_CLIP', 
  data: { channelId, clipId }
});

export const stopClip = (channelId, clipId) => ({
  type: 'STOP_CLIP', 
  data: { channelId, clipId }
});

export const playRow = (rowId) => ({
  type: 'PLAY_ROW', 
  data: { rowId }
});
