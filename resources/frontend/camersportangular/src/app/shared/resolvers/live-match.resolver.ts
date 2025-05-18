import { LiveMatch } from './../../core/models/live-match';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { LiveMatchService } from '../../services/live-match.service';

export const liveMatchResolver: ResolveFn<LiveMatch|null> = (route, state) => {
  const id= route.params["id"];
    if (!id) return null;
    return inject(LiveMatchService).show(id);
};
