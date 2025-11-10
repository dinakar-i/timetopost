import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = async (route, state) => {
  var router = inject(Router);
  var authserve = inject(Authservice);
  if (await authserve.getUser()) return true;
  router.navigate(['/signin']);
  return false;
};
