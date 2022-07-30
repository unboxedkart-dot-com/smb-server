/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { NotificationModel } from 'src/models/admin/notification.model';
export declare class NotificationsService {
    private readonly notificationModel;
    constructor(notificationModel: Model<NotificationModel>);
    addNotification(title: string, subtitle: string, content: string, notificationType: string, notificationDetail: string): Promise<void>;
    getNotifications(): Promise<(import("mongoose").Document<unknown, any, NotificationModel> & NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
