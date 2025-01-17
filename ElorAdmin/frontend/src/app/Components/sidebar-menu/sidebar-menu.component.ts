import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  menuItems = [
    { label: 'Home', icon: 'fa fa-home', routerLink: '/home' }/*,
    { label: 'Global Surveyors', icon: 'fa fa-globe', routerLink: '/surveyors' },
    { label: 'Group Hub Forums', icon: 'fa fa-comments', routerLink: '/forums' },
    { label: 'Survey Photos', icon: 'fa fa-camera-retro', routerLink: '/photos' },
    { label: 'Surveying Tutorials', icon: 'fa fa-film', routerLink: '/tutorials' },
    { label: 'Surveying Jobs', icon: 'fa fa-book', routerLink: '/jobs' },
    { label: 'Tools & Resources', icon: 'fa fa-cogs', routerLink: '/tools' },
    { label: 'Member Map', icon: 'fa fa-map-marker', routerLink: '/map' },
    { label: 'Documentation', icon: 'fa fa-info', routerLink: '/documentation' },*/
  ];
}