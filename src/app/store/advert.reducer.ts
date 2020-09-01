import { createReducer, on, Action } from '@ngrx/store';
import * as AdvertActions from './advert.actions';
import { StoreState } from '../models/StoreState';

export const initialState: StoreState = {
    visitedAdverts: {},
    adverts: [],
    filters: {
        cities: [],
        exp: [],
        tech: [],
        min_salary: 0,
        max_salary: 0
    },
    meta: {
        current_page: 1,
        from: 0,
        to: 0,
        last_page: 0,
        path: "",
        per_page: 0,
        total: undefined
    },
    selectedFilters: {
        activated: false,
        salaryMin: 0,
        salaryMax: 20000,
    },
    error: "Initial",
    isDarkTheme: true
}

const _advertReducer = createReducer(initialState, 
    on(AdvertActions.getAdvertsError, (state, {error}) => ({...state, error: error})),
    on(AdvertActions.getAdvertsSuccess, (state, {adverts, filters, meta})=> ({...state, adverts: adverts, filters: filters, meta: meta})),
    on(AdvertActions.getSingleAdvertSuccess, (state, {advert, id})=> ({...state, visitedAdverts: {...state.visitedAdverts, [id]: advert}})),
    on(AdvertActions.getSingleAdvertError, (state, {error}) => ({...state, error: error})),
    on(AdvertActions.selectAdvert, (state, {advert}) => ({...state, selectedAdvert: advert})),
    on(AdvertActions.setFilters, (state, {selectedFilters, activated})=> ({...state, selectedFilters: {...selectedFilters, activated: activated}})),
    on(AdvertActions.setDarkTheme, (state, {isDarkTheme}) => ({...state, isDarkTheme: isDarkTheme}))
);

export function advertReducer(state: StoreState | undefined, action: Action){
    return _advertReducer(state, action);
}

