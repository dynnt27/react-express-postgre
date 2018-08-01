import { ADMIN_CLASSES_SAVE_QUERY } from  './Types'

export function saveQuery(AdminClasses) {
  return { type: ADMIN_CLASSES_SAVE_QUERY, AdminClasses }
}
