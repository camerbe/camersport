import { ResolveFn } from '@angular/router';
import { User } from '../../core/models/user';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(UserService).show(id);
};
