import { createReducer, on, Action } from '@ngrx/store';
import { getAdvertsError, getAdvertsSuccess, selectAdvert, setFilters} from './advert.actions';
import { AdvertState } from '../models/AdvertState';

export const initialState: AdvertState = {
    selectedAdvert: undefined,
    adverts: [],
    filters: {
        cities: [],
        exp: [],
        tech: [],
        min_salary: 0,
        max_salary: 0
    },
    selectedFilters: {
        salaryMin: 0,
        salaryMax: 20000,
    },
    error: "Initial"
}

const _advertReducer = createReducer(initialState, 
    on(getAdvertsError, (state, {error}) => ({...state, error: error})),
    on(getAdvertsSuccess, (state, {adverts, filters})=> ({...state, adverts: adverts, filters: filters})),
    on(selectAdvert, (state, {advert}) => ({...state, selectedAdvert: advert})),
    on(setFilters, (state, {selectedFilters})=> ({...state, selectedFilters: selectedFilters}))
);

export function advertReducer(state: AdvertState | undefined, action: Action){
    return _advertReducer(state, action);
}

