import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.component.html',
  styleUrls: ['./ipc.component.scss']
})
export class IpcComponent implements OnInit {

  constructor(private _electronService: ElectronService) { }

    public playPingPong() {
        console.log("playPingPong");
        this._electronService
            .ipcRenderer.send('asynchronous-message', 'ping');
    }

    public beep() {
        this._electronService.shell.beep();
    }

  ngOnInit(): void {
  }

}
