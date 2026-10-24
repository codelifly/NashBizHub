import {
  getWorkspaceBag,
  newId,
  nowIso,
  type FavoriteRecord,
} from "./store";

export function listFavorites(
  workspaceId: string,
  userId?: string,
): FavoriteRecord[] {
  const bag = getWorkspaceBag(workspaceId);
  return bag.favorites.filter((f) =>
    userId ? f.userId === userId : true,
  );
}

export function isFavorite(
  workspaceId: string,
  userId: string,
  listingId: string,
): boolean {
  return getWorkspaceBag(workspaceId).favorites.some(
    (f) => f.userId === userId && f.listingId === listingId,
  );
}

export function toggleFavorite(
  workspaceId: string,
  userId: string,
  listingId: string,
): { favorited: boolean; record: FavoriteRecord | null } {
  const bag = getWorkspaceBag(workspaceId);
  const idx = bag.favorites.findIndex(
    (f) => f.userId === userId && f.listingId === listingId,
  );
  if (idx >= 0) {
    bag.favorites.splice(idx, 1);
    return { favorited: false, record: null };
  }
  const ts = nowIso();
  const record: FavoriteRecord = {
    id: newId("fav"),
    workspaceId,
    userId,
    listingId,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.favorites.push(record);
  return { favorited: true, record };
}
