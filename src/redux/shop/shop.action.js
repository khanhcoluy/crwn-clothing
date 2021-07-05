import ShopActionTypes from './shop.types';

export const updateCollections = (collectionsMap) => ({
	type: ShopActionTypes.UPLOAD_COLLECTIONS,
	payload: collectionsMap
});
