import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.component.html',
  styleUrls: ['./ipc.component.scss']
})
export class IpcComponent implements OnInit {

  constructor(private es: ElectronService) { }

    public playPingPong() {
        console.log("playPingPong");
        this.es
            .ipcRenderer.send('asynchronous-message', 'ping');
    }

    public beep() {
        this.es.shell.beep();
    }

  ngOnInit(): void {
  }

}
