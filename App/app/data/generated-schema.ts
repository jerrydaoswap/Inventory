/* do not change this file directly, it is auto generated by `yarn run generate-schema`. */

import { z } from 'zod';

export const schema = {
  collection: z
    .object({
      name: z.string(),
      icon_name: z.string(),
      icon_color: z.string(),
      collection_reference_number: z.string().regex(new RegExp('^[0-9]{2,4}$')),
    })
    .catchall(z.any()),
};

export default schema;
