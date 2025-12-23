import Video from "../models/Video.js";

/**
 * Extracts YouTube video id from a URL.
 * Supports typical youtube.com/watch?v=... and youtu.be/...
 */
const extractYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/.*v=)([a-zA-Z0-9_-]{11})/, // watch?v=
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/, // youtu.be/
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/ // embed/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m && m[1]) return m[1];
  }
  return null;
};

export const createVideo = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    if (!title || !url) return res.status(400).json({ msg: "Title and URL required" });

    const videoId = extractYouTubeId(url);
    if (!videoId) return res.status(400).json({ msg: "Invalid YouTube URL" });

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // prevent duplicate by videoId
    let exists = await Video.findOne({ videoId });
    if (exists) return res.status(400).json({ msg: "Video already exists" });

    const video = await Video.create({
      title,
      url,
      videoId,
      thumbnail,
      description,
      createdBy: req.user?.id || null
    });

    res.json(video);
  } catch (err) {
    console.error("createVideo:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("getVideos:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("deleteVideo:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // if URL changed, recompute videoId + thumbnail
    if (updates.url) {
      const newVid = extractYouTubeId(updates.url);
      if (!newVid) return res.status(400).json({ msg: "Invalid YouTube URL" });
      updates.videoId = newVid;
      updates.thumbnail = `https://img.youtube.com/vi/${newVid}/hqdefault.jpg`;
    }

    const vid = await Video.findByIdAndUpdate(id, updates, { new: true });
    res.json(vid);
  } catch (err) {
    console.error("updateVideo:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
