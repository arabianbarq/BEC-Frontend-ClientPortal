import { LocalStorageService } from './local-storage.service';
import { MessageService } from './message.service';
import { ValidatorService } from './validator.service';


export const services = [
  LocalStorageService,
  ValidatorService,
  MessageService
];

export * from './local-storage.service';
export * from './message.service';
export * from './validator.service';




