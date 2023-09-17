/* Do not change this file directly, it is auto generated by `yarn run generate-schema`. */

import { z } from 'zod';

export const schema = {
  config: z
    .object({
      uuid: z.string(),
      rfid_tag_company_prefix: z.string().regex(new RegExp('^[0-9]{6,12}$')),
      rfid_tag_individual_asset_reference_prefix: z
        .string()
        .regex(new RegExp('^[1-9][0-9]*$')),
      rfid_tag_access_password: z.string().regex(new RegExp('^[a-f0-9]{8}$')),
      default_use_mixed_rfid_tag_access_password: z.boolean().optional(),
      rfid_tag_access_password_encoding: z
        .string()
        .regex(new RegExp('^[a-f0-9]{8}$')),
      collections_order: z.array(z.string()),
    })
    .catchall(z.unknown()),
  collection: z
    .object({
      name: z.string().min(1),
      icon_name: z.string(),
      icon_color: z.string(),
      collection_reference_number: z.string().regex(new RegExp('^[0-9]{2,4}$')),
      item_default_icon_name: z.string().optional(),
      items_order: z.array(z.string()).optional(),
      config_uuid: z.string(),
    })
    .catchall(z.unknown()),
  item: z
    .object({
      name: z.string().min(1),
      icon_name: z.string(),
      icon_color: z.string(),
      collection_id: z.string(),
      item_reference_number: z
        .string()
        .regex(new RegExp('^[0-9]*$'))
        .optional(),
      serial: z.number().int().gte(0).optional(),
      individual_asset_reference: z.string().optional(),
      individual_asset_reference_manually_set: z.boolean().optional(),
      ignore_iar_prefix: z.boolean().optional(),
      epc_tag_uri: z.string().optional(),
      epc_tag_uri_manually_set: z.boolean().optional(),
      rfid_tag_epc_memory_bank_contents: z
        .string()
        .regex(new RegExp('^[A-F0-9]+$'))
        .optional(),
      rfid_tag_epc_memory_bank_contents_manually_set: z.boolean().optional(),
      actual_rfid_tag_epc_memory_bank_contents: z
        .string()
        .regex(new RegExp('^[A-F0-9]+$'))
        .optional(),
      rfid_tag_access_password: z
        .string()
        .regex(new RegExp('^[a-f0-9]{8}$'))
        .optional(),
      use_mixed_rfid_tag_access_password: z.boolean().optional(),
      item_type: z
        .enum([
          'container',
          'generic_container',
          'item_with_parts',
          'consumable',
        ])
        .optional(),
      _can_contain_items: z.boolean().optional(),
      container_id: z.string().optional(),
      always_show_in_collection: z.boolean().optional(),
      _show_in_collection: z.boolean().optional(),
      notes: z.string().optional(),
      model_name: z.string().optional(),
      purchase_price_x1000: z.number().optional(),
      purchase_price_currency: z.string().optional(),
      purchased_from: z.string().optional(),
      purchase_date: z.number().optional(),
      expiry_date: z.number().optional(),
      consumable_stock_quantity: z.number().optional(),
      consumable_will_not_restock: z.boolean().optional(),
      contents_order: z.array(z.string()).optional(),
      config_uuid: z.string(),
    })
    .catchall(z.unknown()),
  db_sharing: z
    .object({ permissions: z.array(z.enum(['read', 'write'])).optional() })
    .catchall(z.unknown()),
};

export default schema;
