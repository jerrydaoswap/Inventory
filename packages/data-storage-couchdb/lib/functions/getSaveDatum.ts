import { attachment_definitions } from '@deps/data/attachments';
import dGetSaveDatum from '@deps/data/functions/getSaveDatum';
import { SaveDatum } from '@deps/data/types';

import {
  getCouchDbId,
  getDatumFromDoc,
  getDocFromDatum,
} from './couchdb-utils';
import getGetAllAttachmentInfoFromDatum from './getGetAllAttachmentInfoFromDatum';
import getGetConfig from './getGetConfig';
import getGetData from './getGetData';
import getGetDatum from './getGetDatum';
import getGetRelated from './getGetRelated';
import { Context } from './types';

export default function getSaveDatum(context: Context): SaveDatum {
  const { db, dbType, logger, logLevels } = context;

  const getConfig = getGetConfig(context);
  const getDatum = getGetDatum(context);
  const getData = getGetData(context);
  const getRelated = getGetRelated(context);
  const getAllAttachmentInfoFromDatum =
    getGetAllAttachmentInfoFromDatum(context);

  const saveDatum = dGetSaveDatum({
    getConfig,
    getDatum,
    getData,
    getRelated,
    getAllAttachmentInfoFromDatum,
    validateAttachments: async d => {
      const attachmentDefn =
        attachment_definitions[d.__type as keyof typeof attachment_definitions];
      if (!attachmentDefn) return null;

      const rawDoc = d.__raw;
      if (!rawDoc || typeof rawDoc !== 'object') {
        return new Error(
          `Expect d.__raw to be an object, got ${typeof rawDoc}`,
        );
      }
      const attachments = (rawDoc as any)._attachments;

      if (!attachments || typeof attachments !== 'object') {
        return new Error(
          `Expect _attachments to be an object, got ${typeof attachments}`,
        );
      }

      for (const [name, defn] of Object.entries(attachmentDefn)) {
        if (!attachments[name]) {
          if (defn.required) {
            return new Error(
              `Missing required attachment "${name}" for type "${d.__type}".`,
            );
          }
          continue;
        }

        if (defn.content_types) {
          if (!defn.content_types.includes(attachments[name].content_type)) {
            return new Error(
              `Attachment "${name}" for type "${d.__type}" has invalid content type "${attachments[name].content_type}".`,
            );
          }
        }
      }

      return null;
    },
    writeDatum: async (d, origD) => {
      const doc = getDocFromDatum(d);

      // Delete deprecated fields
      if ((doc.data as any)?._individual_asset_reference) {
        delete (doc.data as any)._individual_asset_reference;
      }

      const origDoc = origD?.__raw || {};
      const rawDoc = d?.__raw || {};

      if (dbType === 'pouchdb') {
        await db.put({ ...origDoc, ...rawDoc, ...doc });
      } else {
        await db.insert({ ...origDoc, ...rawDoc, ...doc });
      }
    },
    deleteDatum: async d => {
      const doc = getDocFromDatum(d);
      if (dbType === 'pouchdb') {
        await db.put({ _id: doc._id, _rev: doc._rev, _deleted: true });
      } else {
        await db.destroy(doc._id || '', doc._rev || '');
      }
    },
    skipSaveCallback: (existingData, dataToSave) => {
      const logDebug = logLevels && logLevels().includes('debug');
      if (logger && logDebug) {
        logger.debug(
          `saveDatum: skipping save since data has no changes between existing data ${JSON.stringify(
            existingData,
            null,
            2,
          )} and data to save ${JSON.stringify(dataToSave, null, 2)}`,
        );
      }
    },
  });

  return saveDatum;
}
