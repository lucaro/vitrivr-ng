import {AbstractWebsocketService} from "./abstract-websocket.service";
import {ConfigService} from "../basics/config.service";
import {Inject} from "@angular/core";
import {Message} from "../../shared/model/messages/interfaces/message.interface";
import {MessageType} from "../../shared/model/messages/message-type.model";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";


export class CineastAPI extends AbstractWebsocketService {
    /**
     * Subject a Observer of the API can subscribe to.
     */
    private messages : Subject<[MessageType, string]> = new Subject();

    /**
     * Default constructor.
     */
    constructor(@Inject(ConfigService) _configService : ConfigService) {
        super(true);
        _configService.observable.subscribe((config) => {
            if (config.endpoint_ws != null) {
                this.connect(config.endpoint_ws);
            }
        });
    }

    /**
     * This method can be used by the caller to get an Observer for messages received by the local
     * Cineast API endpoint. It is up to the describer to subscribe to the Observer.
     *
     * Note: Use Observer.filter() to filter for message-types
     *
     * @returns {Observable<[MessageType, string]>}
     */
    public observable(): Observable<[MessageType, string]> {
        return this.messages.asObservable();
    }

    /**
     * This is where the magic happens: Subscribes to messages from the underlying WebSocket and orchestrates the
     * assembly of the individual pieces of QueryResults.
     *
     * @param message
     */
    onSocketMessage(message: string): void {
        let msg : Message = <Message>JSON.parse(message);
        if (msg.messageType != undefined) {
            let pair : [MessageType, string] = [msg.messageType, message];
            this.messages.next(pair);
        } else {
            console.log("Received message does not seem to be a valid Cineast API message.");
        }
    }
}
