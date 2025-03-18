import { ResolveFn } from '@angular/router';
import { Competition } from '../../core/models/competition';
import { CompetitionService } from '../../services/competition.service';
import { inject } from '@angular/core';

export const competitionResolver: ResolveFn<Competition | null> = (route, state) => {
  const id= route.params["id"];
    if (!id) return null;
    return inject(CompetitionService).show(id);
};
