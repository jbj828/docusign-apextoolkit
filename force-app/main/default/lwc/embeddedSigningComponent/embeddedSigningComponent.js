import { LightningElement, api } from 'lwc';
import sendEnvelope from '@salesforce/apex/EmbeddedSigningController.sendEnvelope';
import getEmbeddedSigningUrl from '@salesforce/apex/EmbeddedSigningController.getEmbeddedSigningUrl';
import errorHandler from '@salesforce/apex/ErrorHandler.errorHandler';

export default class EmbeddedSigningComponent extends LightningElement {

    template = 'f65039ed-b1d7-4eaf-a3ad-eedd5133105c'; // 'One Signer' template
    description = 'Embedded Signing';
    @api recordId;
    async handleClick() {

        try {
            const res = await sendEnvelope({template: this.template, description: this.description, recordId: this.recordId});
            console.log(res);

            if(res.indexOf("APIException") == 0) {
                // Other than consent error, throw error to show the error message on the browser console.
                throw new Error(res);
            } else if(res.indexOf("https://") == 0) {
                // User needs to grant consent
                window.open(res, '_blank');
            } else {
                const signingUrl = await getEmbeddedSigningUrl({
                    envId: res, 
                    url: window.location.href
                })
                window.location.href = signingUrl;
            }
        } catch (error) {
            console.log('Error:');
            console.log(error);
        }
    }
}