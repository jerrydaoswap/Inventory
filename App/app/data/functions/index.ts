import {
  CouchDBDoc,
  getAttachAttachmentToDatum as couchdbGetAttachAttachmentToDatum,
  getDatumFromDoc as couchdbGetDatumFromDoc,
  getGetAllAttachmentInfoFromDatum as couchdbGetGetAllAttachmentInfoFromDatum,
  getGetAttachmentFromDatum as couchdbGetGetAttachmentFromDatum,
  getGetAttachmentInfoFromDatum as couchdbGetGetAttachmentInfoFromDatum,
  getGetConfig as couchdbGetGetConfig,
  getGetData as couchdbGetGetData,
  getGetDataCount as couchdbGetGetDataCount,
  getGetDatum as couchdbGetGetDatum,
  getGetRelated as couchdbGetGetRelated,
  getSaveDatum as couchdbGetSaveDatum,
  getUpdateConfig as couchdbGetUpdateConfig,
  Logger,
} from '@deps/data-storage-couchdb';

import appLogger, { getLevelsToLog } from '@app/logger';

import { DataTypeName } from '../schema';

import getContext, { GetContextArgs } from './getContext';

export function getDatumFromDoc<T extends DataTypeName>(
  type: T,
  doc: CouchDBDoc | null,
  { logger = appLogger }: { logger?: Logger | null } = {},
) {
  return couchdbGetDatumFromDoc(type, doc, {
    logger,
    logLevels: getLevelsToLog,
  });
}

export function getGetConfig(ctx: GetContextArgs) {
  return couchdbGetGetConfig(getContext(ctx));
}

export function getGetData(ctx: GetContextArgs) {
  return couchdbGetGetData(getContext(ctx));
}

export function getGetDataCount(ctx: GetContextArgs) {
  return couchdbGetGetDataCount(getContext(ctx));
}

export function getGetDatum(ctx: GetContextArgs) {
  return couchdbGetGetDatum(getContext(ctx));
}

export function getGetRelated(ctx: GetContextArgs) {
  return couchdbGetGetRelated(getContext(ctx));
}

export function getSaveDatum(ctx: GetContextArgs) {
  return couchdbGetSaveDatum(getContext(ctx));
}

export function getUpdateConfig(ctx: GetContextArgs) {
  return couchdbGetUpdateConfig(getContext(ctx));
}

export function getAttachAttachmentToDatum(ctx: GetContextArgs) {
  return couchdbGetAttachAttachmentToDatum(getContext(ctx));
}

export function getGetAttachmentInfoFromDatum(ctx: GetContextArgs) {
  return couchdbGetGetAttachmentInfoFromDatum(getContext(ctx));
}

export function getGetAttachmentFromDatum(ctx: GetContextArgs) {
  return couchdbGetGetAttachmentFromDatum(getContext(ctx));
}

export function getGetAllAttachmentInfoFromDatum(ctx: GetContextArgs) {
  return couchdbGetGetAllAttachmentInfoFromDatum(getContext(ctx));
}
