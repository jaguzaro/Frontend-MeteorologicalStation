import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";


const config: SocketIoConfig = {url: 'http://192.168.0.13:4200', options: {}};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [SocketIoModule]
})
export class AppModule{ }
