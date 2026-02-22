import { ActivityLog, ActivityVerb } from '../../domain/activity/entities/ActivityLog';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFileAlt,
  faHeart,
  faComment,
  faUserPlus,
  faUserCheck,
  faUserEdit,
  faUsers,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

interface ActivityDisplayInfo {
  icon: IconDefinition;
  color: string;
  description: string;
}

/**
 * ActivityLogFormatter Service
 * SOLID: Single Responsibility - Format activity log for display
 * SOLID: Open/Closed - Easy to add new verb types
 */
export class ActivityLogFormatter {
  private static verbConfig: Record<string, { icon: IconDefinition; color: string; label: string }> = {
    post_created: { icon: faFileAlt, color: '#3b82f6', label: 'Created a post' },
    post_liked: { icon: faHeart, color: '#ef4444', label: 'Liked a post' },
    post_commented: { icon: faComment, color: '#10b981', label: 'Commented on a post' },
    connection_sent: { icon: faUserPlus, color: '#8b5cf6', label: 'Sent a connection request' },
    connection_accepted: { icon: faUserCheck, color: '#10b981', label: 'Connection accepted' },
    profile_updated: { icon: faUserEdit, color: '#f59e0b', label: 'Updated profile' },
    followed: { icon: faUsers, color: '#6366f1', label: 'Followed someone' },
  };

  static getDisplayInfo(activity: ActivityLog): ActivityDisplayInfo {
    const config = this.verbConfig[activity.verb];
    
    if (config) {
      return {
        icon: config.icon,
        color: config.color,
        description: config.label,
      };
    }

    // Default fallback for unknown verbs
    return {
      icon: faCircle,
      color: '#6b7280',
      description: this.formatVerb(activity.verb),
    };
  }

  static formatVerb(verb: string): string {
    return verb
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
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
}
