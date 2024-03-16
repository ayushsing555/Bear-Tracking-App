import {LightningElement, wire} from 'lwc';
import {subscribe, MessageContext, unsubscribe} from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';
export default class BearMap extends LightningElement {
    mapMarkers = [];
    subscription = null;
    @wire(MessageContext) messageContext;
    connectedCallback() {
        this.subscription = subscribe(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, (message) => {
            this.handleBearListUpdate(message);
        });
    }
    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscribe = null;
    }
    handleBearListUpdate(message) {
        this.mapMarkers = message.bears.map(elem => {
            const Latitude = elem.Location__Latitude__s;
            const Longitude = elem.Location__Longitude__s;
            return {
                location: {Latitude, Longitude},
                title: elem.Name,
                description: `coords: ${Latitude}, ${Longitude}`,
                icon: 'utility:animal_and_nature'
            };
        });
    }
}