import { createAction, props} from '@ngrx/store';
import { Advertisement } from '../models/Advertisement';
import { Filters } from '../models/Filters';
import { SelectedFilters } from '../models/SelectedFilters';

export const getAdverts = createAction('[Data Service] Get Adverts');
export const getAdvertsSuccess = createAction('[Data Service] Get Adverts Success', props<{adverts: Advertisement[], filters: Filters}>());
export const getAdvertsError = createAction('[Data Service] Get Adverts Error', props<{error: string}>());

export const selectAdvert = createAction('[Data Service] Select Advert', props<{advert: Advertisement}>());
export const setFilters = createAction('[Filters Component] Set filters', props<{selectedFilters: SelectedFilters}>());
