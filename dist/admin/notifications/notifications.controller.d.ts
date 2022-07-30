/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(): Promise<(import("mongoose").Document<unknown, any, import("../../models/admin/notification.model").NotificationModel> & import("../../models/admin/notification.model").NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
