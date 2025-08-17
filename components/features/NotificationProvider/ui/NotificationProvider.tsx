"use client";

import { useNotificationStore } from "@/store/NotificationStore";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: "bg-white-glass border-none text-white",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconColorMap = {
  success: "text-white",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

export function NotificationProvider() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed inset-0 z-50 h-fit flex justify-center p-4">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type];

        return (
          <div
            key={notification.id}
            className={cn(
              "notification-slide-in",
              "flex items-center gap-3 p-4 rounded-full border shadow-lg backdrop-blur-sm",
              "transform transition-all duration-300 ease-out",
              colorMap[notification.type]
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                iconColorMap[notification.type]
              )}
            />

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight">
                {notification.title}
              </h4>
            </div>

            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}

      <style jsx>{`
        .notification-slide-in {
          animation: slideInFromTop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInFromTop {
          0% {
            transform: translateY(-100%) translateX(100%);
            opacity: 0;
          }
          50% {
            transform: translateY(-50%) translateX(0%);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0%) translateX(0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
