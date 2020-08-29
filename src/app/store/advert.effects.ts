import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { getAdverts, getAdvertsError, getAdvertsSuccess } from './advert.actions';
import { DataService } from '../services/data.service';

@Injectable()
export class AdvertEffects {
    getAdverts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getAdverts),
            mergeMap(action => 
                this.dataService.getAdverts().pipe(
                    map(adverts => getAdvertsSuccess({adverts: adverts.data, filters: adverts.filters})),
                    catchError(error => of(getAdvertsError({error: error})))
                )    
            )
        )
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ){}


}