const BASE_URL = "http://localhost:3000";

export const getAllMusic = async () => {
  const res = await fetch(`${BASE_URL}/api/music`);
  return res.json();
};


