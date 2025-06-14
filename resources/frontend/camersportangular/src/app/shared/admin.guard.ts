import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';

export const adminGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  let role: string | null = null;
  if (isPlatformBrowser(platformId)) {
    role = localStorage.getItem('role');
  }

  return (role === 'Admin') ? true : new RedirectCommand(router.parseUrl('/secured/dashboard/unauthorized'));
  //return (role === 'Admin') ? true : false;
};
