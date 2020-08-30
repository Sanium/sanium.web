import { createAction, props} from '@ngrx/store';
import { Advertisement } from '../models/Advertisement';
import { Filters } from '../models/Filters';
import { SelectedFilters } from '../models/SelectedFilters';
import { Advertisements } from '../models/Advertisements';
import { Meta } from '../models/Meta';

export const getAdverts = createAction('[Data Service] Get Adverts', props<{page?: number}>());
export const getAdvertsSuccess = createAction('[Data Service] Get Adverts Success', props<{adverts: Advertisement[], filters: Filters, meta: Meta}>());
export const getAdvertsError = createAction('[Data Service] Get Adverts Error', props<{error: string}>());

export const getSingleAdvert = createAction('[Data Service] Get Single Advert', props<{id: number}>());
export const getSingleAdvertSuccess = createAction('[Data Service] Get Single Advert Success', props<{advert: Advertisement, id: number}>());
export const getSingleAdvertError = createAction('[Data Service] Get Single Advert Error', props<{error: string}>());

export const selectAdvert = createAction('[Data Service] Select Advert', props<{advert: Advertisement}>());
export const setFilters = createAction('[Filters Component] Set filters', props<{selectedFilters: SelectedFilters}>());
