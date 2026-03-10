import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const SANITY_PROJECT_ID = "lpvkp4xx";
const SANITY_DATASET = "production";
const SANITY_TOKEN = "skAbZONWfwzuLwPxCPZUSK1dYOFx3kUSjTSdNdw8dov2xE1y4FPW7ONxeKiDR8FfVPCw56DhKhkGpsP6Q4Ffi3ucld9fsXxL4BXao83sJCyJLSsK1Szj9j3qtiBfJ6eIBef9bmZNgX1S0F1r1MLkrYwpOSqyyNUDTgIuE9kBMZz4L8IPHtxt";
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  useCdn: true,
  apiVersion: "2024-01-01"
});
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
export {
  client as c,
  urlFor as u
};
