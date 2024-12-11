import { Component, ViewChild } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-channel-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './channel-input.component.html',
  styleUrl: './channel-input.component.scss',
})
export class ChannelInputComponent {
  message = new Message();
  input: any = '';
  showPlaceholder = true;
  showChannel = false;
  showUser = false;
  currentTag = '';

  savedRange: any;
  @ViewChild('channelTextarea') channelTextarea: any;

  constructor(
    public dataServiceService: DataServiceService,
    private firestore: Firestore
  ) {}

  async saveMessage() {
    if (!this.inputEmpty()) {
      // Dein Code hier

      this.setMessageContent();
      await addDoc(
        collection(
          this.firestore,
          'channels',
          this.dataServiceService.currentChannel.id,
          'messages'
        ),
        this.toJSON()
      ).catch((err) => {});
      this.clearInput();
    } else {
      console.log('input empty');
    }
  }

  inputEmpty(): boolean {
    if (this.channelTextarea) {
      const processedHtml = this.processHtmlElement(
        this.channelTextarea.nativeElement
      );

      console.log(processedHtml.trim());
      if (
        // processedHtml.length === 0 ||
        processedHtml.trim() ===
          `
         <p _ngcontent-ng-c1467907500="" class="placeholder"> Nachricht an #test channel 2 </p>
   `.trim() ||
        processedHtml.trim() ===
          `<p *ngif="showPlaceholder">Nachricht an #test channel 2</p>` ||
        processedHtml.trim() ===
          `<br>` ||
        processedHtml.trim().length < 1
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }

    // if (this.channelTextarea) {
    //   const processedHtml = this.processHtmlElement(
    //     this.channelTextarea.nativeElement
    //   );
    //   if (
    //     processedHtml.length === 0 &&
    //     processedHtml.trim() !==
    //       `
    //   <p _ngcontent-ng-c3229425403="" class="placeholder"> Nachricht an #test channel 2 </p>
    //   `.trim() &&
    //     processedHtml.trim() !==
    //       `
    //   <p *ngif="showPlaceholder">Nachricht an #test channel 2</p>
    //   `
    //   ) {
    //     console.log('input empty', processedHtml.length);
    //     return true;
    //   } else if (processedHtml.length > 0) {
    //     return false;
    //   } else {
    //     console.log('input filled');
    //     console.log(processedHtml.length);

    //     return false;
    //   }
    // } else {
    //   return false;
    // }
  }

  processHtmlElement(htmlElement: HTMLElement): string {
    // Holen Sie sich den Inhalt des HTML-Elements
    const children = htmlElement.childNodes;
    let resultText = '';

    children.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        // Falls es ein Textknoten ist, füge ihn direkt hinzu
        resultText += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        if (
          element.tagName === 'SPAN' &&
          element.classList.contains('tagHighlight')
        ) {
          const uid = element.getAttribute('data-uid');
          const innerText = element.textContent || '';

          if (innerText.startsWith('@')) {
            resultText += `user ᛝȣ₴☯Ꝛ:${uid}`;
          } else if (innerText.startsWith('#')) {
            resultText += `channel ẞ₿Ꜳ֍҂:${uid}`;
          } else {
            resultText += innerText; // Unveränderte Inhalte
          }
        } else {
          // Falls es ein anderes HTML-Element ist
          resultText += element.outerHTML;
        }
      }
    });

    return resultText.trim(); // Entferne unnötige Leerzeichen
  }

  setMessageContent() {
    this.message.message = this.processHtmlElement(
      this.channelTextarea.nativeElement
    );
    this.message.date = Date.now();
    this.message.userId = this.dataServiceService.currentUser.id;
    this.input = '';
  }

  clearInput() {
    const textareaElement = this.channelTextarea.nativeElement;
    textareaElement.innerHTML = /*html*/ `
      <p *ngIf="showPlaceholder">Nachricht an #${this.dataServiceService.currentChannel.name}</p>
    `;
  }

  toJSON() {
    return {
      id: this.message.id,
      userId: this.message.userId,
      date: this.message.date,
      message: this.message.message,
      fileUrl: this.message.fileUrl,
      fileName: this.message.fileName,
      threadCount: this.message.threadCount,
      lastThreadMessage: this.message.lastThreadMessage,
      thumbsUp: this.message.thumbsUp,
      thumbsDown: this.message.thumbsDown,
      rocket: this.message.rocket,
      nerdFace: this.message.nerdFace,
      noted: this.message.noted,
      shushingFace: this.message.shushingFace,
    };
  }

  /**
   * Hides the placeholder in the input area.
   */
  removePlaceholder() {
    const innerText = this.channelTextarea.nativeElement.innerText;

    // Prüft, ob der Text entweder leer ist oder 'Nachricht an #Entwicklerteam' enthält
    if (
      innerText.length === 0 ||
      innerText ===
        'Nachricht an #' + this.dataServiceService.currentChannel.name
    ) {
      const textareaElement = this.channelTextarea.nativeElement;
      textareaElement.innerHTML = ''; // Löscht den Inhalt des Textareas
    }
  }

  /**
   * Restores the placeholder if the message textarea is empty.
   */
  restorePlaceholder() {
    const innerHTML = this.channelTextarea.nativeElement.innerHTML.trim();

    if (innerHTML.length > 0 && innerHTML !== '<br>') {
      // Do nothing if the textarea is not empty or contains only <br>
    } else {
      const textareaElement = this.channelTextarea.nativeElement;
      textareaElement.innerHTML = /*html*/ `
        <p *ngIf="showPlaceholder">Nachricht an #${this.dataServiceService.currentChannel.name}</p>
      `;
    }
  }

  onKeyDown(): void {
    setTimeout(() => {
      const textareaElement = this.channelTextarea.nativeElement;

      // Text bis zur aktuellen Cursor-Position extrahieren
      const textContent = this.extractTextBeforeCursor(textareaElement);
      const match = textContent.match(/[#@][^\s]*$/); // Nur Tags bis zur aktuellen Cursor-Position

      if (match) {
        const currentTag = match[0]; // Das erkannte Tag

        if (currentTag.startsWith('#')) {
          this.showTagChannel(currentTag);
        } else if (currentTag.startsWith('@')) {
          this.showTagUser(currentTag);
        }
      } else {
        this.showChannel = false;
        this.showUser = false;
      }
    }, 0);
  }

  extractTextBeforeCursor(element: HTMLElement): string {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return '';

    const range = selection.getRangeAt(0);
    const clonedRange = range.cloneRange();

    clonedRange.selectNodeContents(element);
    clonedRange.setEnd(range.endContainer, range.endOffset);

    const content = clonedRange.toString();
    return content;
  }

  addTagToInput(type: string, object: any): void {
    this.showChannel = false;
    this.showUser = false;

    if (!this.channelTextarea) return;

    const textareaElement = this.channelTextarea.nativeElement;

    // Stelle die gespeicherte Cursor-Position wieder her
    this.restoreCursorPosition();

    const selection = window.getSelection();

    // Sicherstellen, dass der Cursor im gewünschten Element ist
    if (
      selection &&
      selection.rangeCount > 0 &&
      textareaElement.contains(selection.anchorNode)
    ) {
      this.deleteTag();
      const range = selection.getRangeAt(0);

      // Neues Tag erstellen
      const tagElement = document.createElement('span');
      tagElement.className = 'tagHighlight';
      tagElement.contentEditable = 'false';
      tagElement.setAttribute('data-uid', object.id);
      tagElement.innerText = `${type}${object.name}`;

      // Leerzeichen nach dem Tag
      const spaceNode = document.createTextNode('\u00A0');

      // Tag einfügen
      range.deleteContents(); // Löscht markierten Text
      range.insertNode(tagElement);
      range.collapse(false); // Cursor nach dem Tag platzieren
      range.insertNode(spaceNode);

      // Cursor direkt nach dem Leerzeichen setzen
      range.setStartAfter(spaceNode);
      range.setEndAfter(spaceNode);

      // Auswahl aufheben und Cursor korrekt platzieren
      selection.removeAllRanges();
      selection.addRange(range);

      // Aktualisiere die gespeicherte Cursor-Position
      this.saveCursorPosition();
    } else {
      console.error('Cursor ist nicht im Eingabefeld!');
    }
  }

  deleteTag(): void {
    const textareaElement = this.channelTextarea.nativeElement;
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.startContainer;

      // Sicherstellen, dass der Container ein Textknoten ist
      if (container.nodeType !== Node.TEXT_NODE) {
        console.warn('Der Range-Container ist kein Textknoten.');
        return;
      }

      const fullText = container.textContent || '';
      const cursorOffset = range.startOffset;

      // Text bis zur aktuellen Cursor-Position extrahieren
      const textBeforeCursor = fullText.slice(0, cursorOffset);
      const match = textBeforeCursor.match(/[#@][^\s]*$/); // Nur Tags bis zur aktuellen Cursor-Position

      if (match) {
        const currentTag = match[0];
        const startOffset = cursorOffset - currentTag.length;

        // Nach dem Cursor den Resttext analysieren
        const textAfterCursor = fullText.slice(cursorOffset);
        const nextSpaceIndex = textAfterCursor.search(/\s/);

        // Ende des Tags bestimmen
        const endOffset =
          nextSpaceIndex === -1
            ? fullText.length
            : cursorOffset + nextSpaceIndex;

        // Validierung der Offsets
        if (startOffset >= 0 && endOffset <= fullText.length) {
          // Bereich zum Löschen setzen
          range.setStart(container, startOffset);
          range.setEnd(container, endOffset);
          range.deleteContents();

          // Cursor direkt an die richtige Stelle setzen
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          console.error('Ungültige Offsets für Range-Operation.');
        }
      }
    }
  }

  // Hilfsfunktion, um die aktuelle Cursor-Position zu erhalten
  getCursorPosition(element: HTMLElement): number {
    const selection = window.getSelection();
    if (selection && selection.anchorNode === element.firstChild) {
      return selection.anchorOffset;
    }
    return 0;
  }

  // Hilfsfunktion, um die Cursor-Position einzustellen
  setCursorPosition(element: HTMLElement, position: number): void {
    const range = document.createRange();
    const selection = window.getSelection();

    if (element.firstChild) {
      range.setStart(element.firstChild, position);
      range.collapse(true);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  saveCursorPosition(): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedRange = selection.getRangeAt(0).cloneRange();
    }
  }

  restoreCursorPosition(): void {
    const selection = window.getSelection();
    if (this.savedRange && selection) {
      selection.removeAllRanges();
      selection.addRange(this.savedRange);
    }
  }

  showTagChannel(tag: string): void {
    console.log('Tagging channel:', tag);
    this.showChannel = true;
  }

  showTagUser(tag: string): void {
    console.log('Tagging user:', tag);
    this.showUser = true;
  }

  getCaretPosition(): number {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return 0;
    }
    const range = selection.getRangeAt(0);
    return range.startOffset;
  }
}
