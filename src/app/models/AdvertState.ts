import { Advertisement } from './Advertisement';
import { Filters } from './Filters';
import { SelectedFilters } from './SelectedFilters';

export interface AdvertState {
    selectedAdvert: Advertisement,
    adverts: Advertisement[],
    filters: Filters,
    selectedFilters: SelectedFilters,
    error: string
}