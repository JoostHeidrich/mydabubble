import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';
import { LastUrlService } from '../services/last-url.service';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss', './channel-keyframes.scss'],
})
export class ChannelComponent implements OnInit {
  threadOpen$ = this.uiService.threadOpen$;
  sidebarOpen$ = this.uiService.sidebarOpen$;
  channelId = 'AAAChannelId';
  thradId = 'AAAThradId';

  constructor(
    public uiService: UiService,
    private lastUrlService: LastUrlService
  ) {}
  ngOnInit(): void {
    // this.setAnimation();
  }

  setAnimation() {
    let startWidth = 100;

    let finishedWidth = 100;

    let lastUrl = this.lastUrlService.lastUrl;
    let currentUrl = this.lastUrlService.currentUrl;

    if (lastUrl === undefined) {
      startWidth = 100;
    } else if (lastUrl.includes('sidebar') && !lastUrl.includes('thread')) {
      startWidth = 80;
    } else if (lastUrl.includes('sidebar') && lastUrl.includes('thread')) {
      startWidth = 55;
    } else if (!lastUrl.includes('sidebar') && lastUrl.includes('thread')) {
      startWidth = 75;
    }

    if (currentUrl.includes('sidebar') && !currentUrl.includes('thread')) {
      finishedWidth = 80;
    } else if (
      currentUrl.includes('sidebar') &&
      currentUrl.includes('thread')
    ) {
      finishedWidth = 55;
    } else if (
      !currentUrl.includes('sidebar') &&
      currentUrl.includes('thread')
    ) {
      finishedWidth = 75;
    } else if (
      !currentUrl.includes('sidebar') &&
      !currentUrl.includes('thread')
    ) {
      finishedWidth = 100;
    }

    console.log(startWidth, finishedWidth);

    let className = `transition${startWidth}To${finishedWidth}`;
    return className;
  }

  // createTransitionStyles(
  //   startMarginLeft: number,
  //   startMarginRight: number,
  //   endMarginLeft: number,
  //   endMarginRight: number,
  //   startWidth: number,
  //   endWidth: number
  // ): { [klass: string]: any } {
  //   const styleSheet = document.styleSheets[0];
  //   const keyframes = `
  //     @keyframes dynamicAnimation {
  //       0% {
  //         margin-left: ${startMarginLeft};
  //         margin-right: ${startMarginRight};
  //         width: ${startWidth};
  //       }
  //       100% {
  //         margin-left: ${endMarginLeft};
  //         margin-right: ${endMarginRight};
  //         width: ${endWidth};
  //       }
  //     }
  //   `;

  //   // Füge die Keyframes zu den Stylesheets hinzu
  //   styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  //   return {
  //     animation: `dynamicAnimation 1s ease-in-out forwards`,
  //   };
  // }

  // createKeyframeAnimation(
  //   fromMarginLeft: number,
  //   fromMarginRight: number,
  //   toMarginLeft: number,
  //   toMarginRight: number,
  //   fromWidth: number,
  //   toWidth: number
  // ): { [klass: string]: any } {
  //   const styleSheet = document.styleSheets[0];
  //   const keyframes = `
  //     @keyframes channelAnimation {
  //       from {
  //         margin-left: ${fromMarginLeft}%;
  //         margin-right: ${fromMarginRight}%;
  //         width: ${fromWidth}%;
  //       }
  //       to {
  //         margin-left: ${toMarginLeft}%;
  //         margin-right: ${toMarginRight}%;
  //         width: ${toWidth}%;
  //       }
  //     }
  //   `;
  //   styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  //   console.log(styleSheet);
  //   return {
  //     animation: `channelAnimation 1s ease-in-out forwards`,
  //   };
  // }
}
