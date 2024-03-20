import axios from "axios";

// Rapid API credentials
const rapidAPIKey = import.meta.env.VITE_RAPID_API_KEY;
const rapidAPIHost = import.meta.env.VITE_RAPID_API_HOST;

const echoThriveAPI = axios.create({
  baseURL: rapidAPIHost,
  headers: {
    Accept: "application/json",
  },
});

echoThriveAPI.interceptors.request.use(
  (config) => {
    config.headers["X-RapidAPI-Key"] = rapidAPIKey;
    config.headers["X-RapidAPI-Host"] = rapidAPIHost;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTracksByID = (id?: string) => {
  return echoThriveAPI.get(
    `https://${rapidAPIHost}/tracks/?ids=${"4WNcduiCmDNfmTEz7JvmLv"}`
  );
};
export const getTrackRecommendationBySeedArtist = (seedArtist?: string) => {
  return echoThriveAPI.get(
    `https://${rapidAPIHost}/recommendations/?seed_artists=${"0upXUo04k4k8bGVSkmgrSc"}`
  );
};
