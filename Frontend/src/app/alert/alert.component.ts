import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AlertInterface } from "./types/alert.interface";
import { AlertTypeEnum } from "./types/alertType.enum";
import { CommonModule } from "@angular/common";
import { AlertService } from "../services/alert.service";


@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    standalone: true,
    imports: [CommonModule],
})

export class AlertComponent implements OnInit {
    alert?: AlertInterface;
    timeoutId?: number

    constructor(private alertService: AlertService){}

    ngOnInit(): void {
        this.alertService.getAlert().subscribe((alert) => {
            this.alert=alert;
        });
    }

    resetTimer(): void{
        this.timeoutId = window.setTimeout(() => {
        this.alert = undefined;
        },3000)
    }
}