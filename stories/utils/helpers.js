import React from 'react';
import { select } from '@storybook/addon-knobs';
import { THEMES } from '../../src/utils';
import { AssetPathProvider } from '../../src/components/AssetPathProvider';

const UTILITY_ICONS = [
  '', 'ad_set', 'add', 'adduser', 'anchor', 'announcement', 'answer', 'apex', 'approval',
  'apps', 'arrowdown', 'arrowup', 'attach', 'automate', 'back', 'ban', 'bold', 'bookmark',
  'breadcrumbs', 'broadcast', 'brush', 'bucket', 'builder', 'call', 'campaign', 'capslock',
  'cases', 'center_align_text', 'change_owner', 'change_record_type', 'chart', 'chat', 'check',
  'checkin', 'chevrondown', 'chevronleft', 'chevronright', 'chevronup', 'classic_interface',
  'clear', 'clock', 'close', 'collapse_all', 'comments', 'company', 'connected_apps', 'contract_alt',
  'contract', 'copy_to_clipboard', 'copy', 'crossfilter', 'custom_apps', 'cut', 'dash', 'database',
  'datadotcom', 'dayview', 'delete', 'deprecate', 'description', 'desktop', 'dislike', 'dock_panel',
  'down', 'download', 'edit_form', 'edit', 'email', 'emoji', 'end_call', 'erect_window', 'error',
  'event', 'expand_all', 'expand_alt', 'expand', 'fallback', 'favorite', 'feed', 'file', 'filter',
  'filterList', 'flow', 'forward', 'frozen', 'full_width_view', 'groups', 'help', 'home', 'identity',
  'image', 'inbox', 'info_alt', 'info', 'insert_tag_field', 'insert_template', 'internal_share',
  'italic', 'jump_to_bottom', 'jump_to_top', 'justify_text', 'kanban', 'keyboard_dismiss',
  'knowledge_base', 'layers', 'layout', 'left_align_text', 'left', 'level_up', 'light_bulb',
  'like', 'link', 'list', 'location', 'lock', 'log_a_call', 'logout', 'macros', 'magicwand',
  'mark_all_as_read', 'matrix', 'merge', 'metrics', 'minimize_window', 'moneybag', 'monthlyview',
  'move', 'muted', 'new_direct_message', 'new_window', 'new', 'news', 'note', 'notebook',
  'notification', 'office365', 'offline_cached', 'offline', 'omni_channel', 'open_folder',
  'open', 'opened_folder', 'overflow', 'package_org_beta', 'package_org', 'package', 'page',
  'palette', 'paste', 'pause', 'people', 'phone_landscape', 'phone_portrait', 'photo', 'picklist',
  'power', 'preview', 'priority', 'process', 'push', 'puzzle', 'question_mark', 'question',
  'questions_and_answers', 'quotation_marks', 'rating', 'record_create', 'record', 'redo',
  'refresh', 'relate', 'remove_formatting', 'remove_link', 'replace', 'reply_all', 'reply',
  'reset_password', 'resource_absence', 'resource_capacity', 'resource_territory', 'retweet',
  'richtextbulletedlist', 'richtextindent', 'richtextnumberedlist', 'richtextoutdent',
  'right_align_text', 'right', 'rotate', 'rows', 'salesforce1', 'save', 'search', 'settings',
  'setup_assistant_guide', 'setup', 'share_mobile', 'share_post', 'share', 'shield', 'side_list',
  'signpost', 'sms', 'snippet', 'socialshare', 'sort', 'spinner', 'standard_objects', 'stop',
  'strikethrough', 'success', 'summary', 'summarydetail', 'switch', 'sync', 'table',
  'tablet_landscape', 'tablet_portrait', 'tabset', 'task', 'text_background_color',
  'text_color', 'threedots_vertical', 'threedots', 'thunder', 'tile_card_list', 'topic',
  'touch_action', 'trail', 'trending', 'turn_off_notifications', 'type_tool', 'undelete',
  'undeprecate', 'underline', 'undo', 'unlock', 'unmuted', 'up', 'upload', 'user_role',
  'user', 'video', 'voicemail_drop', 'volume_high', 'volume_low', 'volume_off', 'warning',
  'weeklyview', 'wifi', 'work_order_type', 'world', 'yubi_key', 'zoomin', 'zoomout'
];

export function getUtilityIcons(propName = 'Icon') {
  return select(propName, UTILITY_ICONS, '');
}

const FILE_TYPES = [
  '', 'ai', 'attachment', 'audio', 'box_notes', 'csv', 'eps', 'excel', 'exe',
  'flash', 'folder', 'gdoc', 'gdocs', 'gform', 'gpres', 'gsheet', 'html',
  'image', 'keynote', 'link', 'mp4', 'overlay', 'pack', 'pages', 'pdf', 'ppt',
  'psd', 'quip_doc', 'rtf', 'slide', 'stypi', 'txt', 'unknown', 'video',
  'visio', 'webex', 'word', 'xml', 'zip'
];

export function getFileTypes(propName = 'FileType') {
  return select(propName, FILE_TYPES, '');
}

const SIZES = [
  'x-small',
  'small',
  'medium',
  'large',
];

export function getThemes(propName = 'Theme') {
  return select(propName, THEMES, 'shade');
}

export function getThemesWithoutTexture() {
  return select('Theme', [
    'alt-inverse',
    'default',
    'error',
    'info',
    'inverse',
    'offline',
    'shade',
    'success',
    'warning',
  ], 'default');
}

export function getSizes() {
  return select('Size', SIZES, 'medium');
}

export function getDropdownHeights() {
  return [5, 7, 10];
}

export function withContext(story) {
  return <AssetPathProvider path="assets/">{story()}</AssetPathProvider>;
}

export function withSpacing(story) {
  return (
    <div className="slds-m-around--medium">
      {story()}
    </div>
  );
}
