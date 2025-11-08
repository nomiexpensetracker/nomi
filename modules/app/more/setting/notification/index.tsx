'use client';

import React, { useState } from 'react';

import { Label } from '@/components/atoms/label';
import { Switch } from '@/components/atoms/switch';

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    updateApp: false,
  });

  return (
    <>
      <div className="px-6 py-6 space-y-6 mt-20">
        <div className="text-center text-muted-foreground text-sm">
          In this section, you will be able to manage notifications. We will continue to send you
          notifications for security reasons or if we need to contact you about your account.
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="email-notif" className="text-foreground font-semibold text-base">
                  Email notifications
                </Label>
                <p className="text-muted-foreground text-sm mt-1">
                  You will receive an email about any notification regularly.
                </p>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
          </div>

          {/* In App Notifications */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="inapp-notif" className="text-foreground font-semibold text-base">
                  In app notifications
                </Label>
                <p className="text-muted-foreground text-sm mt-1">
                  You will receive a notification inside the application.
                </p>
              </div>
              <Switch
                id="inapp-notif"
                checked={notifications.inApp}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, inApp: checked })
                }
              />
            </div>
          </div>

          {/* Update Application */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="update-notif" className="text-foreground font-semibold text-base">
                  Update application
                </Label>
                <p className="text-muted-foreground text-sm mt-1">
                  You will receive a notification about update of the application.
                </p>
              </div>
              <Switch
                id="update-notif"
                checked={notifications.updateApp}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, updateApp: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
