import { Advertisement } from './Advertisement';
import { Filters } from './Filters';
import { SelectedFilters } from './SelectedFilters';
import { Advertisements } from './Advertisements';
import { Meta } from './Meta';

export interface AdvertState {
    visitedAdverts: Advertisements,
    adverts: Advertisement[],
    filters: Filters,
    meta: Meta,
    selectedFilters: SelectedFilters,
    error: string
}