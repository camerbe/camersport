import { ResolveFn } from '@angular/router';
import { MatchSheet } from '../../core/models/match-sheet';
import { MatchSheetService } from '../../services/match-sheet.service';
import { inject } from '@angular/core';
import { MatchSheetReponse } from '../../core/models/match-sheet-reponse';

export const matchSheetResolver: ResolveFn<MatchSheetReponse | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(MatchSheetService).show(id);
};
