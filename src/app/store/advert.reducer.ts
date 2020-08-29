import { createReducer, on, Action } from '@ngrx/store';
import * as AdvertActions from './advert.actions';
import { AdvertState } from '../models/AdvertState';

export const initialState: AdvertState = {
    visitedAdverts: {},
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
    on(AdvertActions.getAdvertsError, (state, {error}) => ({...state, error: error})),
    on(AdvertActions.getAdvertsSuccess, (state, {adverts, filters})=> ({...state, adverts: adverts, filters: filters})),
    on(AdvertActions.getSingleAdvertSuccess, (state, {advert, id})=> ({...state, visitedAdverts: {...state.visitedAdverts, [id]: advert}})),
    on(AdvertActions.getSingleAdvertError, (state, {error}) => ({...state, error: error})),
    on(AdvertActions.selectAdvert, (state, {advert}) => ({...state, selectedAdvert: advert})),
    on(AdvertActions.setFilters, (state, {selectedFilters})=> ({...state, selectedFilters: selectedFilters}))
);

export function advertReducer(state: AdvertState | undefined, action: Action){
    return _advertReducer(state, action);
}

