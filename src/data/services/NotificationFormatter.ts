import { Activity } from '../../domain/notification/entities/Activity';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faComment,
  faUserPlus,
  faUserCheck,
  faShare,
  faAt,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

interface NotificationDisplayInfo {
  icon: IconDefinition;
  color: string;
  message: string;
}

/**
 * NotificationFormatter Service
 * SOLID: Single Responsibility - Format notification for display
 * SOLID: Open/Closed - Easy to add new verb types
 */
export class NotificationFormatter {
  private static verbConfig: Record<string, { icon: IconDefinition; color: string; messageTemplate: string }> = {
    liked: { icon: faHeart, color: '#ef4444', messageTemplate: '{actor} liked your post' },
    commented: { icon: faComment, color: '#10b981', messageTemplate: '{actor} commented on your post' },
    connection_request: { icon: faUserPlus, color: '#8b5cf6', messageTemplate: '{actor} sent you a connection request' },
    connection_accepted: { icon: faUserCheck, color: '#10b981', messageTemplate: '{actor} accepted your connection request' },
    shared: { icon: faShare, color: '#3b82f6', messageTemplate: '{actor} shared your post' },
    mentioned: { icon: faAt, color: '#f59e0b', messageTemplate: '{actor} mentioned you in a post' },
  };

  static getDisplayInfo(notification: Activity): NotificationDisplayInfo {
    const config = this.verbConfig[notification.verb];
    
    if (config) {
      return {
        icon: config.icon,
        color: config.color,
        message: config.messageTemplate.replace('{actor}', notification.actor_username),
      };
    }

    // Default fallback for unknown verbs
    return {
      icon: faBell,
      color: '#6b7280',
      message: `${notification.actor_username} ${this.formatVerb(notification.verb)}`,
    };
  }

  static formatVerb(verb: string): string {
    return verb.replace(/_/g, ' ');
  }

  static formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  static isMention(notification: Activity): boolean {
    return notification.verb === 'mentioned';
  }
}
