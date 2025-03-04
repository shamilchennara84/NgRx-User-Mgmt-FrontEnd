import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  retrieveUsersSuccess,
  retrieveProfileSuccess,
  retrieveUsers,
  retrieveProfile,
} from './user.actions';
import { User } from '../../models/user.model';
import { switchMap, map } from 'rxjs';

@Injectable()
export class userEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveProfile),
      switchMap(() => {
        return this.userService.loadProfile().pipe(
          map((data) => {
            return retrieveProfileSuccess({ userDetails: data as User });
          })
        );
      })
    )
  );

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveUsers),
      switchMap(() => {
        return this.userService.loadUsers().pipe(
          map((data) => {
            return retrieveUsersSuccess({ allUsers: data as User[] });
          })
        );
      })
    )
  );
}
