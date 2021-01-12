import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageEmitter: EventEmitter<string>;
  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
    this.messageEmitter.emit(message);
  }

  clear(): void {
    this.messages = [];
  }
}
