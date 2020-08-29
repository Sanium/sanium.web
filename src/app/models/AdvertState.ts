import { Advertisement } from './Advertisement';
import { Filters } from './Filters';
import { SelectedFilters } from './SelectedFilters';
import { Advertisements } from './Advertisements';

export interface AdvertState {
    visitedAdverts: Advertisements,
    adverts: Advertisement[],
    filters: Filters,
    selectedFilters: SelectedFilters,
    error: string
}