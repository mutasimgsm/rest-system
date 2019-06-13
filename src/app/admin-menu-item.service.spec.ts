import { TestBed } from '@angular/core/testing';

import { AdminMenuItemService } from './admin-menu-item.service';

describe('AdminMenuItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMenuItemService = TestBed.get(AdminMenuItemService);
    expect(service).toBeTruthy();
  });
});
