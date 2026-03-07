export const ADMIN_TABLES = [
  'about',
  'feature',
  'history',
  'trusted',
  'comment',
  'faq',
  'info',
  'slider',
] as const;

export type TableName = (typeof ADMIN_TABLES)[number];

export const getTableFields = (table: TableName): string[] => {
  const fields: Record<TableName, string[]> = {
    about: ['title', 'description'],
    feature: ['title', 'description', 'icon'],
    history: ['year', 'title', 'description', 'image'],
    trusted: ['name', 'image'],
    comment: ['title', 'description', 'image'],
    faq: ['question', 'answer'],
    info: ['title', 'description'],
    slider: ['title', 'image'],
  };
  return fields[table] || [];
};

export const getTableLabel = (table: TableName): string => {
  const labels: Record<TableName, string> = {
    about: 'About',
    feature: 'Features',
    history: 'History',
    trusted: 'Trusted Partners',
    comment: 'Comments',
    faq: 'FAQ',
    info: 'Info',
    slider: 'Slider',
  };
  return labels[table] || table;
};
