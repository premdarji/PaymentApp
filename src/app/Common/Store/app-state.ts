import { Product } from 'src/app/models/Product.model';

import { Injectable } from'@angular/core';
import { Actions } from'@ngrx/effects';
import {ActionReducerMap ,MetaReducer } from'@ngrx/store';
import { environment } from 'src/environments/environment';



export interface State {}

export const reducers: ActionReducerMap<State> = { };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export interface AppState{
    // products:Product[];
    // userId:number;  
}

@Injectable()
export class AppEffects {

constructor(privateactions$: Actions) {}
}


