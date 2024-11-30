import { Component } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-header.component.html',
  styleUrl: './channel-header.component.scss',
})
export class ChannelHeaderComponent {
  constructor(public dataServiceService: DataServiceService) {}
}
