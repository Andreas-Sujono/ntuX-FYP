import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CourseAnnouncement } from '../entities/courseAnnouncement.entity';
import { CourseAnnouncementService } from '../services/courseAnnouncement.service';

@Crud({
  model: {
    type: CourseAnnouncement,
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      'createOneBase',
      'getManyBase',
      'deleteOneBase',
    ],
  },
})
@Controller('course-announcement')
export class CourseAnnouncementController
  implements CrudController<CourseAnnouncement>
{
  constructor(public service: CourseAnnouncementService) {}
}
