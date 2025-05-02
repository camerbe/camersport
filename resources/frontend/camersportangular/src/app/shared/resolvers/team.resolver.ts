import { ResolveFn } from '@angular/router';
import { Team } from '../../core/models/team';
import { TeamService } from '../../services/team.service';
import { inject } from '@angular/core';

export const teamResolver: ResolveFn<Team|null> = (route, state) => {
  const id= route.params["id"];
    if (!id) return null;
    return inject(TeamService).show(id);
};
