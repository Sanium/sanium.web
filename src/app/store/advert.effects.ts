import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import * as AdvertActions from './advert.actions';
import { DataService } from '../services/data.service';

@Injectable()
export class AdvertEffects {
    getAdverts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AdvertActions.getAdverts),
            mergeMap(action => 
                this.dataService.getAdverts(action.page, action.filters).pipe(
                    map(adverts => AdvertActions.getAdvertsSuccess({adverts: adverts.data, filters: adverts.filters, meta: adverts.meta})),
                    catchError(error => of(AdvertActions.getAdvertsError({error: error})))
                )    
            )
        )
    );

    getSingleAdvert$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AdvertActions.getSingleAdvert),
            mergeMap(action => 
                this.dataService.getSingleAdvert(action.id).pipe(
                    map(advert => AdvertActions.getSingleAdvertSuccess({advert: advert.data, id: action.id})),
                    catchError(error => of(AdvertActions.getSingleAdvertError({error: error})))
                )    
            )
        )
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ){}
}