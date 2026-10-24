/**
 * Rewrites heroImage + galleryJson in listing-fixtures.ts to 5 webp photos each.
 */
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesPath = path.join(root, "src/server/db/seeds/listing-fixtures.ts");
const imagesPath = path.join(root, "src/config/listing-images.ts");

const { listingFixtures } = await import(pathToFileURL(fixturesPath).href);
const { imagesForListing, LISTING_GALLERY_SIZE } = await import(
  pathToFileURL(imagesPath).href
);

let src = fs.readFileSync(fixturesPath, "utf8");

for (const listing of listingFixtures) {
  const photos = imagesForListing({
    industrySlug: listing.industrySlug,
    kind: listing.kind,
    publicCode: listing.publicCode,
  });

  if (photos.gallery.length !== LISTING_GALLERY_SIZE) {
    console.error("Unexpected gallery size for", listing.publicCode, photos.gallery.length);
    process.exit(1);
  }

  const re = new RegExp(
    `(publicCode: "${listing.publicCode}"[\\s\\S]*?heroImage: )"[^"]+"(,\\s*galleryJson: )\\[[\\s\\S]*?\\],`,
    "m",
  );

  if (!re.test(src)) {
    console.error("Could not patch", listing.publicCode);
    process.exit(1);
  }

  const galleryLiteral =
    "[\n" + photos.gallery.map((img) => `      "${img}",`).join("\n") + "\n    ],";

  src = src.replace(re, `$1"${photos.heroImage}"$2${galleryLiteral}`);
}

fs.writeFileSync(fixturesPath, src);
console.log(
  `Patched ${listingFixtures.length} listings with ${LISTING_GALLERY_SIZE} images each`,
);
