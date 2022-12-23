import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-property-list",
  templateUrl: "./property-list.component.html",
  styleUrls: ["./property-list.component.scss"]
})
export class PropertyListComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  candos1 = [
    {
      title: "Lighting",
      icon: ["fas", "lightbulb"],
      url: "/nest-device"
    },
    {
      title: "Thermostat",
      icon: ["fas", "temperature-high"],
      url: "/nest-device"
    },
    {
      title: "Access",
      icon: ["fas", "lock"],
      url: "/nest-device"
    },
    {
      title: "Cameras",
      icon: ["fas", "camera"],
      url: "/nest-device"
    },
    {
      title: "Doorbell",
      icon: ["fas", "bell"],
      url: "/nest-device"
    },
    {
      title: "TV",
      icon: ["fas", "tv"]
    },
    {
      title: "Vacuum",
      icon: ["fas", "lightbulb"]
    },
    {
      title: "Blinds",
      icon: ["fas", "lightbulb"]
    }
  ];

  candos2 = [
    {
      title: "Messages",
      icon: ["fas", "comment-alt"],
      url: "/message-board/tabs/chat"
    },
    {
      title: "Payments",
      icon: ["fas", "credit-card"],
      url: "/subscription"
    },
    {
      title: "Forum",
      icon: ["fas", "users"],
      url: "/forum"
    },
    {
      title: "Events",
      icon: ["fas", "calendar-alt"],
      url: "/event"
    },
    {
      title: "Amenities",
      icon: ["fas", "hand-holding-water"],
      url: "/amenity"
    },
    {
      title: "Offers",
      url: "/offer",
      icon: ["fas", "gift"]
    },
    {
      title: "Packages",
      icon: ["fas", "archive"]
    },
    {
      title: "Maintenance",
      icon: ["fas", "tasks"],
      url: "/maintenance"
    },
    {
      title: "Visitors",
      icon: ["fas", "user-friends"],
      url: "/visitor"
    },
    {
      title: "Contacts",
      url: "/contact",
      icon: ["fas", "address-card"]
    },
    {
      title: "Restaurant Delivery",
      icon: ["fas", "utensils"]
    },
    {
      title: "Documents",
      icon: ["fas", "file-alt"]
    }
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToDetailPage(card) {
    if (card.url) {
      this.router.navigateByUrl(card.url);
    }
    return;
  }
}
